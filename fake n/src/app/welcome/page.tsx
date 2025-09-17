import { FactCheckForm } from "@/components/fact-check-form";

export default function WelcomePage() {
  return (
    <div className="flex flex-col flex-1 items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-3xl text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold animate-fade-in-up">
          Fact-Checking Dashboard
        </h2>
        <p className="text-lg text-white/80 animate-fade-in-up animation-delay-300">
            Use the tool below to fact-check any content by text, URL, or image.
        </p>
      </div>

      <div className="w-full max-w-3xl mt-8 animate-fade-in-up animation-delay-600">
          <div className="rgb-border">
            <div>
              <FactCheckForm />
            </div>
          </div>
      </div>
    </div>
  );
}
