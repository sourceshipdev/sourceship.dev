"use client";

import { cn } from "@/lib/utils";
import { range } from "lodash";
import Image from "next/image";

interface Props {
  showHeading?: boolean;
  className?: string;
  align?: "left" | "center";
  maskBackgroundColor?: "hsl(var(--background-default)" | "hsl(var(--background-alternative)";
}

const logos = [
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example",
  },
  {
    image: "/logo/example.png",
    alt: "example",
    name: "example ",
  },
];

const LogosRow = ({ className }: { className?: string }) => (
  <div className={cn(className)} suppressHydrationWarning>
    {logos.map((logo) => (
      <div key={`logos-group-${logo.name}`} className="h-12 lg:h-12 w-max !inline-block">
        <Image
          src={logo.image}
          alt={logo.alt}
          width={96}
          height={48}
          className="h-12 lg:h-12 !min-h-12 lg:!min-h-12 w-auto block grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          draggable={false}
        />
      </div>
    ))}
  </div>
);

export function CompanyScroll({ className, showHeading = true, align = "center" }: Props) {
  const gap = "gap-4 lg:gap-8";

  return (
    <div className={cn("pb-14 md:pb-24", className)} suppressHydrationWarning>
      <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div
          className={cn(
            "relative w-full mx-auto max-w-4xl opacity-90",
            "overflow-hidden",
            "before:content[''] before:absolute before:inset-0 before:w-full before:bg-[linear-gradient(to_right,#05000c_0%,transparent_10%,transparent_90%,#05000c_100%)] before:z-10",
            "flex flex-nowrap justify-center",
            "px-5 lg:px-12",
            align === "left" ? "justify-start ml-0" : "justify-center",
            gap
          )}
        >
          {range(0, 4).map((_, i) => (
            <LogosRow
              key={`logos-group-${i}`}
              className={cn(
                gap,
                "flex flex-nowrap w-fit",
                "animate-[marquee_90000ms_linear_both_infinite] will-change-transform",
                "motion-reduce:animate-none motion-reduce:will-change-none"
              )}
            />
          ))}
        </div>
      </div>
      {showHeading && (
        <p className="w-full text-center text-sm text-[#666666] tracking-wider mt-6 lg:mt-8">
          Building a startup? Platform your open source technology today.
        </p>
      )}
    </div>
  );
} 