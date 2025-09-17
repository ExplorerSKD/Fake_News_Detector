import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { WelcomeHeader } from '@/components/welcome-header';
import { cn } from '@/lib/utils';
import { BackgroundIcons } from '@/components/background-icons';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'Veritas',
  description: 'Fact-checking articles, videos, text, and images.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <div className="relative flex flex-col min-h-screen text-white bg-background overflow-hidden">
            <div 
              className={cn(
                "absolute top-0 left-0 w-full h-full z-0",
                "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900",
                "animated-gradient"
              )}
            />
            <BackgroundIcons />
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

            <div className="relative z-20">
              <WelcomeHeader />
            </div>
            
            <main className="relative z-20 flex-1 flex flex-col">
              {children}
            </main>
            
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
