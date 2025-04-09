"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MemoizedBackground } from "@/components/hero/background";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signup } from "../login/actions";
import React from "react";
import Navbar from "@/components/navbardemo";
import { Github } from "lucide-react";

const SignInLayout = ({
  children,
  showSuccess,
}: {
  children: React.ReactNode;
  showSuccess: boolean;
}) => {
  return (
    <div className="relative z-10">
      {!showSuccess && <Navbar />}
      {children}
    </div>
  );
};

const MemoizedSignInLayout = React.memo(SignInLayout);

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(undefined);

    if (!isValidEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const result = await signup(formData);

      if (result.error) {
        setFormError(result.error);
        setLoading(false);
      } else {
        setSuccessMessage(result.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      setFormError("An error occurred during sign up. Please try again.");
      setLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSocialSignIn = (provider: string) => {
    setFormError(
      "Please use email sign-up instead. Social sign-in coming soon!",
    );
  };

  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <MemoizedBackground />
      <MemoizedSignInLayout showSuccess={!!successMessage}>
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
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                  Join the Waitlist
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
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-black"
                  >
                    Join Waitlist
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-black/40 px-2 text-white/60">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleSocialSignIn("github")}
                      className="bg-black/50 border-white/10 text-white hover:bg-black/70"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialSignIn("google")}
                      className="bg-black/50 border-white/10 text-white hover:bg-black/70"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-white/60 text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
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
