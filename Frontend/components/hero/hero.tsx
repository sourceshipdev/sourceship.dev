"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { CompanyScroll } from "@/components/hero/company-scroll";
import Link from "next/link";
import AnnouncementBadge from "@/components/hero/announcement-badge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import AnimatedLogoCloud from './animated-logo-cloud'

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      toast.success("Check your email for the magic link!");
      setEmailSent(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailSent(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="z-40 w-full flex justify-center mb-8">
                <AnnouncementBadge
                  url="/login"
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
              className="flex flex-col items-center justify-center gap-4"
            >
              <div className="flex  flex-col sm:flex-row gap-4">
                <form ref={formRef} onSubmit={handleSignIn} className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
                  <div className="w-full max-w-md bg-black rounded-lg flex flex-row overflow-hidden">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      className="flex-grow h-12 text-base text-white placeholder-gray-400 focus:outline-none px-4"
                      aria-label="Email address"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "h-12 text-white font-medium text-base px-4 rounded-none",
                        emailSent ? "bg-green-500" : "bg-[#FF4D94] hover:bg-[#FF4D94]/90",
                        isLoading && "opacity-50 pointer-events-none",
                      )}
                    >
                      {emailSent ? "Check Email" : "Join Waitlist"}
                    </Button>
                  </div>
                </form>
                <div className="w-full sm:w-auto">
                  <Link href="/how-it-works" className="block w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-12 rounded-xl text-white border-[#FF4D94] hover:bg-[#FF4D94]/20"
                    >
                      <Info className="mr-2 h-5 w-5" />
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-20"
            >
              <AnimatedLogoCloud />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
