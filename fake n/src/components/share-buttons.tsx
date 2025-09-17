"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DisplayableResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  result: DisplayableResult;
}

export function ShareButtons({ result }: ShareButtonsProps) {
  const { toast } = useToast();
  const { truthPercentage, sources } = result;

  const createShareText = (platform: 'twitter' | 'facebook' | 'whatsapp' | 'copy') => {
    let text = `Veritas fact-check: This content is approximately ${truthPercentage}% factual.`;
    if (sources.length > 0) {
      text += `\n\nSource: ${sources[0]}`;
    }
    if (platform !== 'copy') {
       text += `\n\nChecked with Veritas.`;
    }
    return platform === 'copy' ? text : encodeURIComponent(text);
  };

  const shareOnTwitter = () => {
    const text = createShareText('twitter');
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  const shareOnFacebook = () => {
    const text = createShareText('facebook');
    const urlToShare = sources.length > 0 ? sources[0] : window.location.href;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnWhatsApp = () => {
    const text = createShareText('whatsapp');
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyLink = () => {
    const text = createShareText('copy');
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "You can now share the result.",
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Result
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={shareOnTwitter}>
          Share on X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnFacebook}>
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnWhatsApp}>
          Share on WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
