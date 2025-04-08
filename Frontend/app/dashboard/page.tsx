"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemoizedBackground } from "@/components/hero/background";
import Navbar from "@/components/navbar";
import confetti from "canvas-confetti";

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(true);
  const [waitlistNumber, setWaitlistNumber] = useState<number | null>(null);

  useEffect(() => {
    if (showPopup) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [showPopup]);

  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <MemoizedBackground />
      <Navbar />
      
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPopup(false)} />
            
            <motion.div
              className="bg-black/80 p-8 rounded-2xl border border-white/10 max-w-md w-full relative z-10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="w-16 h-16 rounded-full bg-[#FF4D94]/20 flex items-center justify-center mb-6 mx-auto"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-8 h-8 text-[#FF4D94]"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to the Waitlist!
                </h2>
                
                <p className="text-white/60 mb-6">
                  Thank you for joining SourceShip! We're still building something amazing, and you're now part of our journey.
                </p>

                <p className="text-white/60 mb-6">
                  We'll notify you as soon as we're ready to launch.
                  </p>


                <Button
                  onClick={() => setShowPopup(false)}
                  className="bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-black w-full"
                >
                  Got it!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Dashboard
          </h1>
          <p className="text-white/60">
            Your journey with SourceShip begins here. We're working hard to bring you the best experience possible.
          </p>
        </div>
      </div>
    </main>
  );
}