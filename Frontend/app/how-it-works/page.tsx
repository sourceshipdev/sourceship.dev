"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy, Brain, Target, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbardemo";
import Footer from "@/components/footer";
import { Background } from "@/components/hero/background";
import { Globe } from "@/components/magicui/globe";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <motion.li 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-[14rem] list-none ${area}`}
    >
      <div className="relative h-full rounded-2.5xl border border-white/10 p-2 md:rounded-3xl md:p-3">
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 p-6 backdrop-blur-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-white/20 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-white/80">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

const GlobeItem = ({ area }: { area: string }) => {
  return (
    <motion.li 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-[14rem] list-none ${area}`}
    >
      <div className="relative h-full rounded-2.5xl border border-white/10 p-2 md:rounded-3xl md:p-3">
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-white/10 backdrop-blur-sm">
          <div className="relative flex h-full flex-col items-center justify-end overflow-hidden pt-8">
            <div className="relative z-10 text-center space-y-2 mb-12">
              <h3 className="text-2xl font-semibold text-white">
                Community Growth
              </h3>
              <p className="text-white/80 text-sm/[1.125rem] md:text-base/[1.375rem] max-w-md">
                Join a thriving community of developers, contribute to meaningful projects, and grow your network through collaborative innovation.
              </p>
            </div>
            <div className="relative w-full flex-1 overflow-hidden">
              <Globe className="scale-150" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05000c] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default function HowItWorks() {
  return (
    <Background>
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-24"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                How{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D94] via-[#FF904D] to-[#2D0153]/90">
                  It Works
                </span>
              </h1>
              <p className="text-gray-400 text-xl">
                Build your portfolio through real-world impact.
              </p>
            </motion.div>

            <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 mb-24">
              <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Brain className="h-6 w-6 text-[#FF4D94]" />}
                title="Challenge-Based Learning"
                description="Solve real-world problems, collaborate with peers, and showcase your skills through open source and industry-sponsored challenges."
              />
              <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<Rocket className="h-6 w-6 text-[#FF4D94]" />}
                title="AI-Powered Portfolio"
                description="Our AI automatically builds a professional portfolio from your projects, highlighting your best work for recruiters."
              />
              <GlobeItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              />
              <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Trophy className="h-6 w-6 text-[#FF4D94]" />}
                title="Career-Boosting Opportunities"
                description="Companies discover talent based on real contributions, giving you direct hiring opportunities without the hassle of traditional applications."
              />
              <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<Target className="h-6 w-6 text-[#FF4D94]" />}
                title="Leaderboard & Recognition"
                description="Climb the leaderboard, earn badges, and get noticed by top companies based on your impact, not just your resume."
              />
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <Link href="/sign-in">
                <PulsatingButton
                  className="bg-[#FF4D94] hover:bg-[#BF77F7]/80 text-black px-8 py-6 text-lg font-medium"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Building Your Projects
                </PulsatingButton>
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </Background>
  );
}
