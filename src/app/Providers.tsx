"use client";

import { ReactNode } from "react";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ThemeProvider } from "@/components/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </LiveblocksProvider>
  );
}
