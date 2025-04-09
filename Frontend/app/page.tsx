'use client';

import Hero from "@/components/hero/hero";
import NavbarDemo from "@/components/navbardemo";
import Footer from "@/components/footer";
import { Background } from "@/components/hero/background";
import HowItWorks from "@/components/landing/how-it-works";

export default function Home() {
  return (
    <Background>
      <div className="relative z-10">
        <NavbarDemo />
        <div className="pt-20">
          <Hero />
          <HowItWorks />
        </div>
        <Footer />
      </div>
    </Background>
  );
}
