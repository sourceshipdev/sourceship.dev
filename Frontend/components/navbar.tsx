"use client";

import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
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
    router.push('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Image src={Logo} alt="logo" className="w-8 h-8" />
        <span className="text-white font-medium text-xl">SourceShip.dev</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/how-it-works">How it Works</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        <GitHubStars />
      </div>

      {!loading && (
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <Button 
              onClick={handleSignOut}
              variant="ghost" 
              className="text-white hover:text-[#FF4D94]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-[#FF4D94]">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-black">
                  Join Waitlist
                </Button>
              </Link>
            </>
          )}
        </div>
      )}

      <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
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
