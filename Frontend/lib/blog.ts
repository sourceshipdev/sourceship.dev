'use server';

import { compileMDX } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { MDXRemoteProps } from 'next-mdx-remote';
import { JSXElementConstructor, ReactElement } from 'react';

const BLOG_DIR = '_blog';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  readTime: string;
  image?: string;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
}

export async function fetchBlogPosts() {
  try {
    const fullPath = path.join(process.cwd(), BLOG_DIR);
    
    // Check if directory exists
    try {
      await fs.access(fullPath);
    } catch (error) {
      console.error('Blog directory not found:', error);
      return []; // Return empty array instead of throwing
    }

    // Read directory
    const files = await fs.readdir(fullPath);
    if (!files.length) {
      console.log('No files found in blog directory');
      return [];
    }

    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          try {
            const filePath = path.join(fullPath, file);
            const content = await fs.readFile(filePath, 'utf8');

            const { data: frontmatter, content: mdxContent } = matter(content);
            const slug = file.replace(/\.mdx$/, '');

            try {
              const { content: compiledContent } = await compileMDX({
                source: mdxContent,
                options: {
                  parseFrontmatter: true,
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, rehypeHighlight],
                  },
                }
              });

              return {
                ...frontmatter,
                slug,
                content: compiledContent,
                wordCount: mdxContent.split(/\s+/).length,
                readingTime: Math.ceil(mdxContent.split(/\s+/).length / 200)
              };
            } catch (mdxError) {
              console.error(`MDX compilation failed for ${file}:`, mdxError);
              return null; // Skip this post if MDX compilation fails
            }
          } catch (error) {
            console.error(`Error processing ${file}:`, error);
            return null; // Skip this post if processing fails
          }
        })
    );

    // Filter out null entries and sort
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error in fetchBlogPosts:', error);
    return []; // Return empty array instead of throwing
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    console.error('No slug provided');
    return null;
  }

  try {
    const fullPath = path.join(process.cwd(), BLOG_DIR);
    const filePath = path.join(fullPath, `${slug}.mdx`);
    
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error('Blog post not found:', error);
      return null;
    }

    const content = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter, content: mdxContent } = matter(content);

    try {
      const { content: compiledContent } = await compileMDX({
        source: mdxContent,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeHighlight],
          },
        }
      });

      // Calculate read time based on words per minute (assuming 200 words per minute)
      const wordCount = mdxContent.split(/\s+/).length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;

      if (!frontmatter.title || !frontmatter.date || !frontmatter.author || !frontmatter.excerpt) {
        console.error(`Missing required frontmatter in ${slug}.mdx`);
        return null;
      }

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        author: frontmatter.author,
        excerpt: frontmatter.excerpt,
        readTime,
        image: frontmatter.image,
        content: compiledContent
      };
    } catch (mdxError) {
      console.error(`MDX compilation failed for ${slug}:`, mdxError);
      return null;
    }
  } catch (error) {
    console.error('Error in fetchBlogPost:', error);
    return null;
  }
} 