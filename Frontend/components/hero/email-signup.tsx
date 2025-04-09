"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

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
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col items-stretch gap-4 sm:flex-row">
      <div className="relative flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-base text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:border-[#FF4D94] focus:outline-none focus:ring-1 focus:ring-[#FF4D94]"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-14 rounded-xl bg-[#FF4D94] px-8 text-base font-medium text-white disabled:opacity-50"
        style={{
          "--primary": "#FF4D94"
        } as React.CSSProperties}
      >
        {isLoading ? "Sending..." : "Join Waitlist"}
      </Button>
    </form>
  );
} 