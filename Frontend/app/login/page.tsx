"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MemoizedBackground } from "@/components/hero/background";
import Navbar from "@/components/navbar";
import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { login, signup } from './actions'
import { useRouter } from 'next/navigation'
import React from "react";

const SuccessAnimation = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
    className="w-24 h-24 rounded-full bg-[#FF4D94]/20 flex items-center justify-center mb-8 mx-auto"
  >
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-12 h-12 text-[#FF4D94]"
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
);

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignInLayout = ({ children, showSuccess }: { children: React.ReactNode, showSuccess: boolean }) => {
  const isLoginPage = true; // Since this is the login page

  return (
    <div className="relative z-10">
      {(!showSuccess || isLoginPage) && <Navbar />}
      {children}
    </div>
  );
};

const MemoizedSignInLayout = React.memo(SignInLayout);

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Check for error in URL hash
    if (typeof window !== 'undefined') {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');
      
      if (error) {
        setFormError(errorDescription?.replace(/\+/g, ' ') || 'Authentication failed');
        
        // Clean up the URL
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(undefined);
    setSuccessMessage(undefined);
    
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('email', email);

      const result = await login(formData);

      if (result.error) {
        setFormError(result.error);
        setLoading(false);
      } else {
        setSuccessMessage(result.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      setFormError('An error occurred during sign in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <MemoizedBackground />
      <MemoizedSignInLayout showSuccess={!!successMessage}>
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div className="max-w-md mx-auto">
            {loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  Sending Magic Link...
                </h2>
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4D94]" />
                </div>
              </motion.div>
            ) : successMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  Check Your Email
                </h2>
                <p className="text-white/60 text-center mb-6">
                  {successMessage}
                </p>
                <Button
                  onClick={() => {
                    setEmail("");
                    setSuccessMessage(undefined);
                  }}
                  className="w-full bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-black"
                >
                  Send Another Link
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  Join Waitlist
                </h2>
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6"
                  >
                    <p className="mb-2">{formError}</p>
                    <Button
                      onClick={() => {
                        setFormError(undefined);
                        setEmail("");
                      }}
                      variant="ghost"
                      className="text-sm text-red-500 hover:text-red-400 p-0"
                    >
                      Try sending a new magic link
                    </Button>
                  </motion.div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-black"
                  >
                    Send Magic Link
                  </Button>
                </form>
                <div className="mt-8 text-center">
                  <p className="text-white/60 text-sm">
                    By signing in, you'll be added to our waitlist.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </MemoizedSignInLayout>
    </main>
  );
}
