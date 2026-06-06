"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, RocketIcon, LightningBoltIcon, HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { InteractiveBoardMockup } from "@/components/InteractiveBoardMockup";

const DURATION = 0.8;
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

export const LandingHero = () => {
  return (
    <div className="flex relative flex-col gap-8 justify-center items-center pt-20 w-full h-full sm:pt-24 lg:pt-32 px-6 lg:px-12">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-white/80">Real-time collaboration powered by Liveblocks</span>
        </div>
      </motion.div>

      {/* Main heading with gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.1 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold sm:text-7xl lg:text-8xl xl:text-9xl">
          <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Organize
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Everything
          </span>
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.2 }}
        className="max-w-2xl text-center"
      >
        <p className="text-lg sm:text-xl lg:text-2xl text-white/60 leading-relaxed">
          The modern project management tool that helps teams move faster,
          <br className="hidden sm:block" />
          collaborate better, and ship with confidence.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <Link href="/api/auth/signin">
          <Button 
            className="relative px-8 py-6 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
          >
            <span className="inline-flex items-center gap-3 font-semibold">
              Get Started Free
              <ArrowRightIcon className="w-5 h-5" />
            </span>
          </Button>
        </Link>
        <Link href="#features">
          <Button 
            variant="outline"
            className="px-8 py-6 text-base bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-xl transition-all duration-300"
          >
            <span className="inline-flex items-center gap-3">
              See Features
              <LightningBoltIcon className="w-5 h-5" />
            </span>
          </Button>
        </Link>
      </motion.div>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-6 mt-12"
      >
        {[
          { icon: RocketIcon, label: "Lightning Fast", color: "text-purple-400" },
          { icon: HeartIcon, label: "Built with Love", color: "text-pink-400" },
          { icon: LightningBoltIcon, label: "Real-time Sync", color: "text-cyan-400" },
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-white/60">
            <feature.icon className={cn("w-5 h-5", feature.color)} />
            <span className="text-sm font-medium">{feature.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Interactive Board Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.6 }}
        className="w-full max-w-6xl mt-16 mb-8"
      >
        <div className="relative">
          {/* Glow effect behind mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
          
          {/* Mockup container with glassmorphism */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <InteractiveBoardMockup />
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION, ease: EASE_OUT, delay: 0.8 }}
        className="grid grid-cols-3 gap-8 mt-12 max-w-2xl"
      >
        {[
          { value: "10k+", label: "Active Users" },
          { value: "50k+", label: "Tasks Completed" },
          { value: "99.9%", label: "Uptime" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-sm text-white/40 mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
