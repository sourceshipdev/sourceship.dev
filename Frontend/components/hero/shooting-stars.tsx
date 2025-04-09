'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShootingStarsProps {
  starColor?: string;
  trailColor?: string;
  minDelay?: number;
  maxDelay?: number;
}

export function ShootingStars({ 
  starColor = "#FF4D94", 
  trailColor = "#FF904D",
  minDelay = 2100,
  maxDelay = 4200
}: ShootingStarsProps) {
  const [stars, setStars] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: Math.random() * (maxDelay - minDelay) + minDelay,
    }));
    setStars(newStars);
  }, [minDelay, maxDelay]);

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: starColor,
            boxShadow: `0 0 10px ${starColor}, 0 0 20px ${trailColor}`,
          }}
          initial={{ x: "100vw", y: Math.random() * 100 + "%" }}
          animate={{ x: "-100vw" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
} 