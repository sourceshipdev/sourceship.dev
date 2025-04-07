'use client';

import { motion } from "framer-motion";
import { CalendarDays, Clock, User } from "lucide-react";
import type { BlogPost } from '@/lib/blog';
import { Suspense } from 'react';

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          <span>{new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        {post.title}
      </h1>

      <div 
        className="prose prose-invert max-w-none 
          prose-p:text-gray-200 
          prose-headings:text-white 
          prose-strong:text-white
          prose-a:text-[#FF4D94] hover:prose-a:text-[#FF4D94]/80
          prose-ul:text-gray-200
          prose-ol:text-gray-200
          prose-li:text-gray-200
          prose-blockquote:text-gray-200
          prose-blockquote:border-[#FF4D94]
          prose-code:text-gray-200
          prose-pre:bg-black/40
          prose-pre:text-gray-200
          [&_pre]:p-4
          [&_pre]:rounded-lg
          [&_pre]:border
          [&_pre]:border-white/10
          [&_code]:font-mono
          [&_code]:text-sm
          [&_blockquote]:border-l-4
          [&_blockquote]:pl-4
          [&_blockquote]:italic"
      >
        <Suspense fallback={<div>Loading...</div>}>
          {post.content}
        </Suspense>
      </div>
    </motion.div>
  );
} 