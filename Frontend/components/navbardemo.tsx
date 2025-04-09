"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Logo from "../public/logo/logo.png";
import Link from "next/link";
import type React from "react";
import { GitHubStars } from "@/components/hero/github-stars";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export default function NavbarDemo() {
  const navItems = [
    {
      name: "How It Works",
      link: "/how-it-works",
    },
    {
      name: "Blog",
      link: "/blog",
    },
  ];

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">
              <GitHubStars />
            </NavbarButton>
            {!loading && isAuthenticated ? (
              <NavbarButton
                onClick={() => {
                  handleSignOut();
                }}
                variant="primary"
                className="w-full"
              >
                Sign out
              </NavbarButton>
            ) : (
              <NavbarButton variant="primary" className="w-full bg-[#FF4D94]" href="/login">
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                <GitHubStars />
              </NavbarButton>

              {!loading && isAuthenticated ? (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Sign out
                </NavbarButton>
              ) : (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
