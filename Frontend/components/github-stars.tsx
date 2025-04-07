"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";

export function GitHubStars() {
  const [stars, setStars] = useState<number>(1);

  useEffect(() => {
    fetch("https://api.github.com/repos/sourceshipdev/sourceship.dev")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch((error) => {
        console.error("Error fetching GitHub stars:", error);
      });
  }, []);

  return (
    <Link
      href="https://github.com/sourceshipdev/sourceship.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
    >
      <Star className="w-4 h-4 text-yellow-400" />
      <span className="text-sm text-white font-medium">{stars}</span>
    </Link>
  );
} 