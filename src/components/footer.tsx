import { cn } from "@/lib/utils";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("text-sm text-white/40 text-center z-20", className)}>
      © 2026 Trello Clone. All rights reserved.
    </div>
  );
};
