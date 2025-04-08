"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Logo from "../public/logo/logo.png";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { GitHubStars } from "@/components/hero/github-stars";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={Logo} alt="Logo" width={32} height={32} />
            <span className="font-bold text-white">SourceShip</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/how-it-works">How it Works</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <GitHubStars />
          {!loading && isAuthenticated ? (
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-white hover:text-white/80"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Link href="/login">
              <Button
                className="bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-black"
              >
                Join Waitlist
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF4D94] transition-all group-hover:w-full" />
    </Link>
  );
}
