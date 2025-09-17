import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { GraduationCap, Newspaper, Users, ScanText, ShieldCheck, BookCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-1 items-center text-center p-4 text-white">
        <div className="space-y-6 max-w-3xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Know the Truth, Instantly.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 animation-delay-300">
            Veritas is your AI-powered tool for fact-checking articles, text, and images. Separate fact from fiction with confidence.
          </p>
          <div className="animation-delay-600">
            <Button asChild size="lg" className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/50">
              <Link href="/welcome">Get Started for Free</Link>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-6xl mt-16 text-left animate-fade-in-up animation-delay-900">
          <h3 className="text-3xl font-bold mb-8 text-center">Who Benefits from Veritas?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="angled-card">
              <div className="angled-card-header">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h4 className="angled-card-title">Students & Academics</h4>
              </div>
              <p className="angled-card-content">Verify sources for research papers and avoid misinformation in your studies.</p>
            </div>
             <div className="angled-card">
              <div className="angled-card-header">
                <Newspaper className="h-8 w-8 text-primary" />
                <h4 className="angled-card-title">Journalists & Editors</h4>
              </div>
              <p className="angled-card-content">Quickly fact-check claims, sources, and images to ensure journalistic integrity.</p>
            </div>
             <div className="angled-card">
              <div className="angled-card-header">
                <Users className="h-8 w-8 text-primary" />
                <h4 className="angled-card-title">Everyday Users</h4>
              </div>
              <p className="angled-card-content">Navigate the digital world with confidence by checking news and social media posts.</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl mt-16 text-left animate-fade-in-up animation-delay-900">
          <h3 className="text-3xl font-bold mb-8 text-center">Core Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-card-header">
                <ScanText className="h-8 w-8 text-primary" />
                <h4 className="feature-card-title">Comprehensive Analysis</h4>
              </div>
              <p className="feature-card-content">Paste text or a URL to get an instant analysis of the content's factual accuracy, with corrections provided.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-header">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h4 className="feature-card-title">Visual Verification</h4>
              </div>
              <p className="feature-card-content">Upload an image to extract and fact-check text, perfect for verifying memes and social media screenshots.</p>
            </div>
            <div className="feature-card">
              <div className="feature-card-header">
                <BookCheck className="h-8 w-8 text-primary" />
                <h4 className="feature-card-title">Credible Sourcing</h4>
              </div>
              <p className="feature-card-content">Every fact-check is backed by a list of a list of credible sources, empowering you to verify the information yourself.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
