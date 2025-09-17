"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FileText, Link, ImageUp, Loader2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { checkText, checkUrl, checkImage } from "@/app/actions";

function SubmitButton({ isPending, children }: { isPending: boolean, children: React.ReactNode }) {
  return (
    <Button 
      type="submit" 
      className="w-full mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
      disabled={isPending}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

export function FactCheckForm() {
  const [activeTab, setActiveTab] = useState("text");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>("");

  const router = useRouter();

  const handleTextSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      setError(null);
      const result = await checkText(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        sessionStorage.setItem('factCheckResult', JSON.stringify(result.data));
        router.push('/welcome/result');
      }
    });
  };

  const handleUrlSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      setError(null);
      const result = await checkUrl(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        sessionStorage.setItem('factCheckResult', JSON.stringify(result.data));
        router.push('/welcome/result');
      }
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(async () => {
      setError(null);
      const result = await checkImage(imageData);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        sessionStorage.setItem('factCheckResult', JSON.stringify(result.data));
        router.push('/welcome/result');
      }
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Tabs defaultValue="text" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50 text-foreground border border-border">
          <TabsTrigger value="text" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"><FileText className="mr-2 h-4 w-4" />Text</TabsTrigger>
          <TabsTrigger value="url" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"><Link className="mr-2 h-4 w-4" />URL</TabsTrigger>
          <TabsTrigger value="image" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"><ImageUp className="mr-2 h-4 w-4" />Image</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <TabsContent value="text">
              <form onSubmit={handleTextSubmit}>
                <Textarea
                  name="text"
                  placeholder="Paste the text you want to fact-check here..."
                  className="min-h-[150px] text-base bg-secondary/30 border-border placeholder:text-muted-foreground focus:bg-secondary/50"
                  required
                />
                <SubmitButton isPending={isPending && activeTab === 'text'}>Check Text</SubmitButton>
              </form>
          </TabsContent>
          <TabsContent value="url">
              <form onSubmit={handleUrlSubmit}>
                <Input
                  name="url"
                  type="url"
                  placeholder="https://example.com/article"
                  className="text-base bg-secondary/30 border-border placeholder:text-muted-foreground focus:bg-secondary/50"
                  required
                />
                <SubmitButton isPending={isPending && activeTab === 'url'}>Check URL</SubmitButton>
              </form>
          </TabsContent>
          <TabsContent value="image">
              <form>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="file:text-primary file:font-semibold bg-secondary/30 border-border placeholder:text-muted-foreground focus:bg-secondary/50"/>
                {imagePreview && <img src={imagePreview} alt="Image preview" className="mt-4 rounded-md object-contain max-h-60 mx-auto border-2 border-border" />}
                <Button 
                  onClick={handleImageSubmit} 
                  className="w-full mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
                  disabled={isPending || !imageData}>
                  {(isPending && activeTab === 'image') && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Check Image
                </Button>
              </form>
          </TabsContent>
        </div>
      </Tabs>
      
      {isPending && (
         <div className="flex flex-col justify-center items-center space-y-4 text-muted-foreground p-8 border border-dashed border-border rounded-lg bg-secondary/30">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold">Analyzing... this may take a moment.</p>
        </div>
      )}

      {error && !isPending && (
        <Alert variant="destructive" className="bg-destructive/20 border-destructive/50 text-destructive-foreground">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
