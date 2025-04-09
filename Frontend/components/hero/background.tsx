'use client';

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { Stars } from "lucide-react";

interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function Background({ children, className }: BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const gradientOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0.2, 0.3]);
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-[#05000c] antialiased relative overflow-hidden">
      <motion.div 
        ref={containerRef}
        className="relative w-full"
        style={{
          background: "linear-gradient(to bottom, #05000c 70%, #0a0014 80%, #0f001a 90%, #140020 95%, #1a0026 96%, #2a0036 97%, #FF904D 100%)",
        }}
      >
        <ShootingStars
          starColor="#FF4D94"
          trailColor="#FF904D"
          minDelay={2100}
          maxDelay={4200}
        />
        <StarsBackground/>
        <div className={cn("relative z-10", className)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export const MemoizedBackground = memo(Background);