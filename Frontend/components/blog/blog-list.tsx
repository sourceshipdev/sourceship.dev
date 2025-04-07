'use client';

import { motion } from "framer-motion";
import Blogpost from './blogpost';
import type { BlogPost } from '@/lib/blog';

interface BlogListProps {
  initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  return (
    <div className="space-y-12">
      {initialPosts.length > 0 ? (
        initialPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Blogpost {...post} />
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
        </motion.div>
      )}
    </div>
  );
} 