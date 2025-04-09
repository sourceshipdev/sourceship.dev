'use client';

import Hero from "@/components/hero/hero";
import NavbarDemo from "@/components/navbardemo";
import Footer from "@/components/footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const gradientOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0.2, 0.3]);
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="min-h-screen bg-[#05000c] antialiased relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="relative w-full"
        style={{
          background:
            "linear-gradient(to bottom, #05000c, #0a0014, #0f001a, #140020, #1a0026)",
        }}
      >
        <ShootingStars
          starColor="#FF4D94"
          trailColor="#FF904D"
          minDelay={2100}
          maxDelay={4200}
        />
        <StarsBackground/>
        <div className="relative z-10">
          <NavbarDemo />
          <div className="pt-20">
            <Hero />
            {/* Waiting to feel this space with some shit*/}
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)]"></div>
            <div className="relative min-h-[calc(100vh-4rem)] text-center">
              More coming soon :)
            </div>
          </div>
        </div>
        <Footer />
      </motion.div>
    </main>
  );
}
