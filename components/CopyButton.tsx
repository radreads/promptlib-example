"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", {
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to copy. Please try again.");
      console.error("Copy failed:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label="Copy prompt to clipboard"
    >
      {label}
    </Button>
  );
}
