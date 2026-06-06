"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const sessionInfo = useSession();
  const session = sessionInfo?.data;
  const status = sessionInfo?.status || "loading";
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0f] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent"></div>
          <p className="text-sm font-medium text-white/60">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 py-12 text-white">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl md:p-10"
      >
        {/* Trello Branded Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center justify-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 p-2.5 shadow-lg shadow-cyan-500/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="5" fill="none"/>
                <path d="M5 5H10V19H5V5ZM14 5H19V13H14V5Z" fill="#0a0a0f"/>
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Trello
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Sign in to access your boards, collaborate with your team, and track your projects in real-time.
          </p>
        </div>

        {/* Login Button Container */}
        <div className="mt-8 flex flex-col gap-4">
          <Button
            className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-6 text-sm font-bold text-black shadow-lg shadow-white/5 hover:bg-gray-100 hover:shadow-white/10 transition-all duration-300 border-0"
            onClick={() => signIn("google")}
            shine
          >
            {/* Google Icon SVG */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.87-4.53-5.84-4.53z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="font-semibold text-gray-900">Continue with Google</span>
            <ArrowRightIcon className="h-4 w-4 text-gray-900 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            Secure, encrypted authentication powered by NextAuth. By signing in, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
