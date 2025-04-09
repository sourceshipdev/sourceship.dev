"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import exampleLogo from "../../public/logo/example.png";
import { Marquee } from "@/components/magicui/marquee";

interface Props {
  showHeading?: boolean;
  className?: string;
  align?: "left" | "center";
}

const logos = [
  {
    image: exampleLogo,
    alt: "example",
    name: "example",
  },
  {
    image: exampleLogo,
    alt: "example",
    name: "example",
  },
  {
    image: exampleLogo,
    alt: "example",
    name: "example",
  },
  {
    image: exampleLogo,
    alt: "example",
    name: "example",
  },
  {
    image: exampleLogo,
    alt: "example",
    name: "example",
  },
  {
    image: exampleLogo,
    alt: "example",
    name: "example",
  },
];

const firstRow = logos.slice(0, logos.length / 2);
const secondRow = logos.slice(logos.length / 2);

const LogoItem = ({ logo }: { logo: typeof logos[0] }) => (
  <div className="h-16 w-max px-12">
    <Image
      src={logo.image}
      alt={logo.alt}
      width={160}
      height={80}
      className="h-16 w-auto block grayscale hover:grayscale-0 transition-all duration-300"
      draggable={false}
      priority
    />
  </div>
);

// check https://www.firecrawl.dev/ implementation 
export function CompanyScroll({ className, showHeading = true, align = "center" }: Props) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <p className="mb-8 text-center text-sm font-medium tracking-wider text-[#666666]">
        Building a startup? Platform your open source technology today.
      </p>
      <div className="mask-image-fade w-full">
        <div className="flex flex-col gap-8">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((logo) => (
              <LogoItem key={logo.name} logo={logo} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((logo) => (
              <LogoItem key={logo.name} logo={logo} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
} 