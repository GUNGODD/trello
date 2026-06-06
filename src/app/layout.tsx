import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import { Providers } from "./Providers";
import { Toaster } from "@/components/Toaster";
import { CommandPaletteWrapper } from "@/components/CommandPaletteWrapper";

const inter = Inter({ 
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Trello Clone",
  description: "Collaborative Trello board with Liveblocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${instrumentSerif.variable}`}>
        <Providers>
          {children}
          <Toaster />
          <CommandPaletteWrapper />
        </Providers>
      </body>
    </html>
  );
}
