"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy, Brain, Target, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbardemo";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useDelayedReveal } from "@/hooks/use-delayed-reveal";

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
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

            <BentoGrid className="mb-24">
              <BentoGridItem
                content={
                  <ContentLines
                    delay={0}
                    icon={<Brain className="w-6 h-6 text-[#FF4D94]" />}
                    title="Challenge-Based Learning"
                    description={
                      <span className="text-lg">
                        Solve real-world problems, collaborate with peers, and
                        showcase your skills through open source and
                        industry-sponsored challenges.
                      </span>
                    }
                  />
                }
              />
              <BentoGridItem
                content={
                  <ContentLines
                    delay={100}
                    icon={<Rocket className="w-6 h-6 text-[#FF4D94]" />}
                    title="AI-Powered Portfolio"
                    description={
                      <span className="text-lg">
                        Our AI automatically builds a professional portfolio
                        from your projects, highlighting your best work for
                        recruiters.
                      </span>
                    }
                  />
                }
              />
              <BentoGridItem
                className="bg-gradient-to-br from-[#FF4D94] to-[#BF77F6]/60 border-0"
                content={
                  <ContentLines
                    delay={200}
                    icon={<Target className="w-6 h-6 text-[#BF77F6]" />}
                    title={
                      <span className="text-black">
                        Leaderboard & Recognition
                      </span>
                    }
                    description={
                      <span className="text-black text-lg">
                        Climb the leaderboard, earn badges, and get noticed by
                        top companies based on your impact, not just your
                        resume.
                      </span>
                    }
                  />
                }
              />
              <BentoGridItem
                className="md:col-span-2"
                content={
                  <ContentLines
                    delay={200}
                    icon={<Target className="w-6 h-6 text-[#FF4D94]" />}
                    title="Career-Boosting Opportunities"
                    description={
                      <span className="text-lg">
                        Companies discover talent based on real contributions,
                        giving you direct hiring opportunities without the
                        hassle of traditional applications.
                      </span>
                    }
                  />
                }
              />
              <BentoGridItem
                content={
                  <ContentLines
                    delay={300}
                    icon={<Users className="w-6 h-6 text-[#FF4D94]" />}
                    title="Community Growth"
                    description={
                      <span className="text-lg">
                        Join a community of developers who are passionate about
                        building and growing together.
                      </span>
                    }
                  />
                }
              />
            </BentoGrid>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-[#FF4D94] hover:bg-[#BF77F7]/80 text-black px-8"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Building Your Projects
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

const ContentLines = ({
  delay,
  icon,
  title,
  description,
}: {
  delay: number;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) => {
  const { showLines, showText } = useDelayedReveal(delay);

  return (
    <div className="absolute inset-0 p-4">
      {!showText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-2 mt-12"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showLines ? 1 : 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-2 bg-[#FF4D94]/20 rounded-full w-full origin-left"
            />
          ))}
        </motion.div>
      )}
      {showText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <div className="font-semibold text-white">{title}</div>
          </div>
          <div className="text-sm text-neutral-300">{description}</div>
        </motion.div>
      )}
    </div>
  );
};
