

"use client";

import { CheckCircle, XCircle, Link as LinkIcon, ExternalLink, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DisplayableResult } from "@/lib/types";
import { ShareButtons } from './share-buttons';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface FactCheckResultDisplayProps {
  result: DisplayableResult;
}

export function FactCheckResultDisplay({ result }: FactCheckResultDisplayProps) {
  const { truthPercentage, correctedContent, sources } = result;

  const getStatus = (percentage: number) => {
    if (percentage > 80) return { text: "Highly Factual", icon: <CheckCircle className="h-6 w-6 text-green-400" />, color: "#4ade80" };
    if (percentage > 50) return { text: "Likely Factual", icon: <CheckCircle className="h-6 w-6 text-yellow-400" />, color: "#facc15" };
    if (percentage > 20) return { text: "Likely False", icon: <XCircle className="h-6 w-6 text-orange-400" />, color: "#fb923c" };
    return { text: "Highly Unlikely", icon: <XCircle className="h-6 w-6 text-red-500" />, color: "#f87171" };
  };

  const status = getStatus(truthPercentage);

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.text("Veritas Fact-Check Report", 105, 20, { align: 'center' });

    // Status and Percentage
    doc.setFontSize(16);
    const statusColor = truthPercentage > 50 ? [0, 128, 0] : [255, 0, 0];
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(`${status.text}: ${truthPercentage}% Factual`, 105, 35, { align: 'center' });
    doc.setTextColor(0, 0, 0); // Reset color

    // Analysis Section
    doc.setFontSize(14);
    doc.text("Analysis & Corrections", 14, 50);
    doc.setFontSize(11);
    const splitAnalysis = doc.splitTextToSize(correctedContent, 180);
    doc.text(splitAnalysis, 14, 60);

    const analysisHeight = doc.getTextDimensions(splitAnalysis).h;
    let finalY = 60 + analysisHeight + 10;
    
    // Sources Table
    if (sources && sources.length > 0) {
      doc.setFontSize(14);
      doc.text("Credible Sources", 14, finalY);
      
      autoTable(doc, {
        startY: finalY + 5,
        head: [['Sources']],
        body: sources.map(s => [s]),
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] },
        didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 0) {
                const url = ensureAbsoluteUrl(data.cell.text[0]);
                doc.link(10, data.cell.y + 2, 190, data.cell.height - 4, { url });
            }
        }
      });
    }

    doc.save("veritas-fact-check-report.pdf");
  };

  const ensureAbsoluteUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="w-full animate-in fade-in-50 duration-500 grid grid-cols-1 lg:grid-cols-3 gap-8 text-card-foreground" id="fact-check-result">
      
      {/* Left Column: Analysis */}
      <Card className="bg-card/80 backdrop-blur-sm border-border lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Analysis & Corrections</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base text-muted-foreground leading-relaxed">{correctedContent}</p>
        </CardContent>
      </Card>

      {/* Right Column: Score & Sources */}
      <div className="lg:col-span-1 space-y-8">
          {/* Score */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
             <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-40 h-40">
                    <CircularProgressbar
                        value={truthPercentage}
                        text={`${truthPercentage}%`}
                        styles={buildStyles({
                          rotation: 0.25,
                          strokeLinecap: 'round',
                          textSize: '20px',
                          pathTransitionDuration: 0.5,
                          pathColor: status.color,
                          textColor: 'hsl(var(--foreground))',
                          trailColor: 'hsl(var(--secondary))',
                          backgroundColor: 'hsl(var(--background))',
                        })}
                      />
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    {status.icon}
                    <h3 className="text-2xl font-semibold">{status.text}</h3>
                  </div>
                  <div className="flex justify-center gap-2 pt-4">
                    <Button onClick={handleDownloadPdf} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <ShareButtons result={result} />
                  </div>
                </div>
             </CardContent>
          </Card>
          
          {/* Sources */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <LinkIcon className="h-5 w-5 mr-2" />
                Credible Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-60 rounded-md border p-4">
                {sources.length > 0 ? (
                  <ul className="space-y-2">
                    {sources.map((source, index) => (
                      <li key={index} className="flex items-start">
                        <ExternalLink className="h-4 w-4 mr-2 mt-1 shrink-0 text-primary" />
                        <a 
                          href={ensureAbsoluteUrl(source)}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline break-all text-sm"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">No sources found.</p>
                    </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
      </div>

    </div>
  );
}
