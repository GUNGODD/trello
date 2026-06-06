"use client";

import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";

export default function LandingPage() {
  return (
    <main className="p-inset h-[100dvh] w-full bg-[#0a0a0f] text-white overflow-hidden">
      <div className="relative h-full w-full">
        {/* Background video */}
        <Background 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4" 
          placeholder="/alt-placeholder.png" 
        />
        
        {/* Newsletter subscription and Login panel */}
        <Newsletter />
        
        {/* Footer with social icons, positioned absolutely at the bottom */}
        <Footer className="absolute bottom-[calc(var(--inset)+0.8rem)] md:bottom-[calc(var(--inset)+1.5rem)] left-1/2 -translate-x-1/2 z-20" />
      </div>
    </main>
  );
}
