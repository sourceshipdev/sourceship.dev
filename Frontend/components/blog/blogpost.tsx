"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Clock, User } from "lucide-react";

interface BlogPostProps {
  title?: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readTime?: string;
  slug?: string;
  children?: React.ReactNode;
}

export default function Blogpost({
  title = "The Future of Open Source Internships",
  excerpt = "Discover how Tuebornaut is revolutionizing the way students gain real-world experience through open source contributions.",
  author = "Team Tuebornaut",
  date = "April 5, 2024",
  readTime = "5 min read",
  slug = "future-of-open-source-internships",
  children
}: BlogPostProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/40 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden max-w-4xl mx-auto text-left"
    >
      <Link href={`/blog/${slug}`}>
        <div className="p-8">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 hover:text-[#FF4D94] transition-colors">
            {title}
          </h2>
          <p className="text-gray-200 line-clamp-3">
            {excerpt}
          </p>
          <div className="mt-6">
            <span className="text-[#FF4D94] hover:text-[#FF4D94]/80 transition-colors inline-flex items-center gap-2">
              Read More
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                className="text-lg"
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </Link>
      {children}
    </motion.article>
  );
}