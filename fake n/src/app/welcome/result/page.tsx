
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FactCheckResultDisplay } from "@/components/fact-check-result";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { DisplayableResult } from "@/lib/types";

export default function ResultPage() {
  const [result, setResult] = useState<DisplayableResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedResult = sessionStorage.getItem('factCheckResult');
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult));
      } catch (e) {
        console.error("Failed to parse result from session storage", e);
      }
    }
    setLoading(false);
  }, []);

  const handleGoBack = () => {
    sessionStorage.removeItem('factCheckResult');
    router.push('/welcome');
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white bg-background overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 animated-gradient"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      <main className="relative z-20 flex flex-col flex-1 items-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-7xl">
          <div className="flex justify-start mb-8">
            <Button onClick={handleGoBack} variant="outline" className="bg-transparent hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Check Another
            </Button>
          </div>
        
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Fact-Check Report
          </h2>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {!loading && result && (
             <div className="rgb-border">
                <div>
                    <div className="p-4 md:p-6">
                        <FactCheckResultDisplay result={result} />
                    </div>
                </div>
             </div>
          )}

          {!loading && !result && (
            <div className="text-center text-muted-foreground bg-card/80 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-card-foreground">No result found.</h3>
              <p>It seems there was an issue retrieving your fact-check analysis.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
