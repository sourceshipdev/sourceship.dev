"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn, Info } from "lucide-react";
import { FloatingLogo } from "@/components/floating-Logo";
import { CompanyScroll } from "@/components/company-scroll";
import Link from "next/link";
import AnnouncementBadge from "@/components/announcement-badge";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="z-40 w-full flex justify-center -mt-4 lg:-mt-12 mb-8">
              <AnnouncementBadge
                url="/create-account"
                announcement="Waitlist now!"
                badge="W1D0"
                target="_blank"
                className="[&_a]:sm:gap-4 [&_.announcement-badge]:!text-xs [&_.announcement-text]:!text-xs [&_.announcement-badge]:sm:!text-sm [&_.announcement-text]:sm:!text-sm"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              No internship?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D94] via-[#FF904D] to-[#2D0153]/90">
                No problem!
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            <span className="block text-gray-300 mb-2">
              The open source internship alternative.
            </span>
            Showcase your skills through real impact and turn your contributions
            into portfolios, presentations, and recruitable insights.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/create-account">
              <Button
                size="lg"
                className="bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-black px-8"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Join Waitlist
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-[#FF4D94] hover:bg-[#FF4D94]/20"
              >
                <Info className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20"
          >
            <CompanyScroll />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <FloatingLogo />
      </div>
    </div>
  );
}
