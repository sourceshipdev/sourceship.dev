import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Blogpost from '@/components/blog/blogpost';
import { fetchBlogPosts } from '@/lib/blog';
import BlogList from '@/components/blog/blog-list';

export const dynamic = 'force-dynamic';

export default async function Blog() {
  const posts = await fetchBlogPosts();

  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                B<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D94] via-[#FF904D] to-[#2D0153]/90">log</span>
              </h1>
              <p className="text-gray-400 text-xl">
                Insights, Updates, and Stories
              </p>
            </div>

            <BlogList initialPosts={posts} />

            <div className="text-center mt-24">
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-[#FF4D94] hover:bg-[#FF4D94]/80 text-white px-8"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Join the Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
