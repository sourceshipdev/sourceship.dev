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

const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 10;
  const hasNoSpaces = !/\s/.test(password);
  const hasNoRepeatingChars = !/(.)\1{2,}/.test(password);

  return {
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSymbol,
    isLongEnough,
    hasNoSpaces,
    hasNoRepeatingChars,
    isValid:
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSymbol &&
      isLongEnough &&
      hasNoSpaces &&
      hasNoRepeatingChars,
  };
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

export default function CreateAccount() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSymbol: false,
    isLongEnough: false,
    hasNoSpaces: false,
    hasNoRepeatingChars: false,
    isValid: false,
  });

  const handleSocialSignIn = async (provider: 'github' | 'google') => {
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
    setFormError(undefined);
    
    if (!isValidEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!passwordChecks.isValid) {
      setFormError('Please ensure your password meets all requirements.');
      return;
    }

    if (!passwordsMatch) {
      setFormError('Passwords do not match.');
      return;
    }

    if (!acceptedTerms) {
      setFormError('Please accept the terms of service to continue.');
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Implement account creation
      console.log('Creating account for:', email);
      handleComplete();
    } catch (error: any) {
      console.error('Error creating account:', error);
      let errorMessage = 'An error occurred during sign up. Please try again.';
      setFormError(errorMessage);
      setLoading(false);
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
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordChecks(validatePassword(newPassword));
    setPasswordsMatch(newPassword === confirmPassword);
    setFormError(undefined);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
    setFormError(undefined);
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
      <span className={`text-sm ${met ? 'text-green-500' : 'text-red-500'}`}>
        {text}
      </span>
    </div>
  );

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
                  Creating your account
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
                  Welcome Aboard!
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
                  Create Account
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
                      placeholder="Create a password"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <PasswordRequirement
                        met={passwordChecks.hasUpperCase}
                        text="Uppercase letter"
                      />
                      <PasswordRequirement
                        met={passwordChecks.hasLowerCase}
                        text="Lowercase letter"
                      />
                      <PasswordRequirement
                        met={passwordChecks.hasNumber}
                        text="Number"
                      />
                      <PasswordRequirement
                        met={passwordChecks.hasSymbol}
                        text="Special character"
                      />
                      <PasswordRequirement
                        met={passwordChecks.isLongEnough}
                        text="10+ characters"
                      />
                      <PasswordRequirement
                        met={passwordChecks.hasNoSpaces}
                        text="No spaces"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className="bg-black/50 border-white/10 text-white"
                      placeholder="Confirm your password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referralCode" className="text-white">
                      Referral Code (Optional)
                    </Label>
                    <Input
                      id="referralCode"
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                      placeholder="Enter referral code if you have one"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="h-4 w-4 rounded border-white/10 bg-black/50 text-[#FF4D94] focus:ring-[#FF4D94]"
                    />
                    <Label htmlFor="terms" className="text-white/60 text-sm">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-[#FF4D94] hover:text-[#FF4D94]/80"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-[#FF4D94] hover:text-[#FF4D94]/80"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FF4D94] hover:bg-[#FF4D94]/90 text-white"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
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
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="text-[#FF4D94] hover:text-[#FF4D94]/80"
                    >
                      Sign in
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