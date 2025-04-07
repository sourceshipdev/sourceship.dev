"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MemoizedBackground } from "@/components/background";
import Navbar from "@/components/navbar";
import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
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
  return (
    <div className="relative z-10">
      {!showSuccess && <Navbar />}
      {children}
    </div>
  );
};

const MemoizedSignInLayout = React.memo(SignInLayout);

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [attempts, setAttempts] = useState(0);
  const [lastAttempt, setLastAttempt] = useState<number | null>(null);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);

  const checkRateLimit = () => {
    const now = Date.now();
    if (lastAttempt && now - lastAttempt < 5000) {
      return false;
    }
    if (attempts >= 5) {
      const timeSinceFirstAttempt = now - (lastAttempt || now);
      if (timeSinceFirstAttempt < 300000) {
        return false;
      }
      setAttempts(0);
    }
    return true;
  };

  const handleSocialSignIn = async (provider: 'github' | 'google') => {
    if (!checkRateLimit()) {
      setFormError('Too many attempts. Please wait a moment before trying again.');
      return;
    }

    setLoading(true);
    setFormError(undefined);
    try {
      // TODO: Implement social sign-in
      console.log('Social sign-in with:', provider);
    } catch (error) {
      console.error('Error signing in with social provider:', error);
      setFormError('Failed to sign in with social provider. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkRateLimit()) {
      setFormError('Too many attempts. Please wait a moment before trying again.');
      return;
    }

    setFormError(undefined);
    
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setFormError('Please enter your password.');
      return;
    }

    setLoading(true);
    setLastAttempt(Date.now());
    setAttempts(prev => prev + 1);
    
    try {
      // TODO: Implement sign-in logic
      console.log('Signing in with:', email);
      handleComplete();
    } catch (error: any) {
      console.error('Error signing in:', error);
      let errorMessage = 'An error occurred during sign in. Please try again.';
      setFormError(errorMessage);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address to reset your password.');
      return;
    }

    try {
      // TODO: Implement password reset
      console.log('Resetting password for:', email);
      setFormError('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setFormError('Failed to send password reset email. Please try again.');
    }
  };

  const handleComplete = () => {
    setLoading(false);
    setShowSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFormError(undefined);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setFormError(undefined);
  };

  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <MemoizedBackground />
      <MemoizedSignInLayout showSuccess={showSuccess}>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto">
            {loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  Signing you in
                </h2>
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4D94]" />
                </div>
              </motion.div>
            ) : showSuccess ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center bg-black/40 p-12 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <SuccessAnimation />
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome Back!
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                  We're still building something amazing. You are #{waitlistPosition} on the waitlist. We'll notify you as soon as we're ready!
                </p>
                <Button
                  onClick={() => router.push('/')}
                  className="w-full bg-[#FF4D94] hover:bg-[#FF4D94]/90 text-white"
                >
                  Go to Dashboard
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
                  Sign In
                </h2>
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6"
                  >
                    {formError}
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
                      onChange={handleEmailChange}
                      className="bg-black/50 border-white/10 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="bg-black/50 border-white/10 text-white"
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FF4D94] hover:bg-[#FF4D94]/90 text-white"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      className="text-[#FF4D94] hover:text-[#FF4D94]/80 text-sm"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-black/40 text-white/60">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="bg-black/50 border-white/10 text-white hover:bg-black/70"
                      onClick={() => handleSocialSignIn('github')}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-black/50 border-white/10 text-white hover:bg-black/70"
                      onClick={() => handleSocialSignIn('google')}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-white/60 text-sm">
                    Don't have an account?{" "}
                    <Link
                      href="/create-account"
                      className="text-[#FF4D94] hover:text-[#FF4D94]/80"
                    >
                      Sign up
                    </Link>
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
