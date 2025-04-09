'use client';

import Hero from "@/components/hero/hero";
import NavbarDemo from "@/components/navbardemo";
import Footer from "@/components/footer";
import { Background } from "@/components/hero/background";

export default function Home() {
  return (
    <Background>
      <div className="relative z-10">
        <NavbarDemo />
        <div className="pt-20">
          <Hero />
          {/* Waiting to feel this space with some shit*/}
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)]"></div>
          <div className="relative min-h-[calc(100vh-4rem)] text-center">
            More coming soon :)
          </div>
        </div>
      </div>
      <Footer />
    </Background>
  );
}
