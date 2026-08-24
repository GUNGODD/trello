"use client";

import { ReactNode } from "react"; 
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ThemeProvider } from "@/components/ThemeContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <ThemeProvider>
          {children} 
        </ThemeProvider>
      </LiveblocksProvider>
    </SessionProvider> 
  );
}
