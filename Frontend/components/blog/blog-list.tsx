'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Post } from "@/lib/blog";

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="space-y-12">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`}>
              <article className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#FF4D94] transition-colors">
                  {post.title}
                </h2>
                <div className="text-gray-400 text-sm mb-4">
                  {formatDate(post.date)}
                </div>
                <p className="text-gray-300">{post.excerpt}</p>
              </article>
            </Link>
          </motion.div>
        ))
      ) : (
        <div className="text-center text-gray-400">No blog posts found.</div>
      )}
    </div>
  );
} 