"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "../public/logo/logo.png";
import { useEffect, useState } from "react";

const messages = [
  "no internship? Damn...",
  "bro needs experience",
  "looking steep. better waitlist now",
  "OPEN SOURCE! OPEN SOURCE!",
];

export function FloatingLogo() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative translate-x-[-10%]">
          <motion.div
            className="absolute -inset-4 bg-[#FF904D]/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <Image src={logo} alt="logo" className="w-32 h-32" />
          
          {/* Minecraft-style chat bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -top-16 right-0 md:-right-32"
          >
            <div className="relative">
              <div className="bg-[#2D0153] text-white px-4 py-2 rounded-lg shadow-lg max-w-[200px] md:max-w-xs whitespace-nowrap">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm font-minecraft"
                  >
                    {messages[currentMessage]}
                  </motion.p>
                </AnimatePresence>
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-[#2D0153] transform rotate-45"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
