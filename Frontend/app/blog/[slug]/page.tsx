import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbardemo";
import { fetchBlogPost } from "@/lib/blog";
import BlogPostContent from "@/components/blog/blog-post-content";
import "highlight.js/styles/github-dark.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <article className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-block mb-8">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <BlogPostContent post={post} />
          </div>
        </article>
      </div>
    </main>
  );
}
