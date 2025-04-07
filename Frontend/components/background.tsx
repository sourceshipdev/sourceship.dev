"use client"

import React from "react"

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#2D0153]/[0.96] bg-grid-white/[0.02]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[#2D0153]/[0.96] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}

export const MemoizedBackground = React.memo(Background) 