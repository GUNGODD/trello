"use client";

import { useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { FormNewsletter } from "@/components/form-newsletter";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { inputVariants } from "@/components/ui/input";
import { signIn } from "next-auth/react";

const DURATION = 0.3;
const DELAY = DURATION;
const EASE_OUT = "easeOut";
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const;
const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
};

export const Newsletter = () => {
  const isInitialRender = useRef(true);

  return (
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8 z-10">
      <motion.div
        layout="position"
        transition={{ duration: DURATION, ease: EASE_OUT }}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 p-2.5 shadow-lg shadow-cyan-500/25">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="5" fill="none" />
              <path d="M5 5H10V19H5V5ZM14 5H19V13H14V5Z" fill="#0a0a0f" />
            </svg>
          </div>
          <h1 className="font-sans font-extrabold text-5xl tracking-tight sm:text-7xl lg:text-8xl text-foreground text-center">
            Trello
          </h1>
        </div>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          <motion.div
            key="newsletter"
            initial={isInitialRender.current ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={{
              visible: {
                scale: 1,
                transition: {
                  delay: DELAY,
                  duration: DURATION,
                  ease: EASE_OUT,
                },
              },
              hidden: {
                scale: 0.9,
                transition: { duration: DURATION, ease: EASE_OUT },
              },
              exit: {
                y: -150,
                scale: 0.9,
                transition: { duration: DURATION, ease: EASE_OUT },
              },
            }}
          >
            <div className="flex flex-col gap-4 w-full max-w-xl md:gap-6 lg:gap-8">
              <motion.p
                initial={isInitialRender.current ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                }}
                transition={{
                  duration: DURATION,
                  ease: EASE_OUT,
                  delay: DELAY,
                }}
                className="text-base short:lg:text-lg sm:text-lg lg:text-xl !leading-relaxed font-normal text-center text-foreground/80 text-pretty max-w-lg mx-auto"
              >
                Trello brings all your tasks, teammates, and tools together. Keep everything in the same place, even if your team isn&apos;t.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            layout="position"
            transition={SPRING}
            key="button"
            className="mt-6"
          >
            <Button
              className={cn("relative px-8 py-6 text-sm font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-500 hover:via-sky-500 hover:to-blue-600 border-0 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 rounded-full inline-flex items-center gap-3")}
              onClick={() => signIn('google')}
              shine
            >
              <span>Continue with Google</span>
              <ArrowRightIcon className="w-4 h-4 text-current" />
            </Button>
          </motion.div>
        </AnimatePresenceGuard>
      </div>
    </div>
  );
};

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence mode="popLayout" propagate>{children}</AnimatePresence>;
};
