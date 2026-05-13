import React from "react";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

const BlogPage = () => {
  const posts = [
    {
      title: "How to Launch Your E-commerce Empire in 2024",
      excerpt: "Everything you need to know about setting up your storefront and managing inventory.",
      date: "May 10, 2024",
      category: "E-commerce",
      readTime: "8 min read"
    },
    {
      title: "Optimizing Your Restaurant Operations with Disibin",
      excerpt: "Streamline your kitchen tickets and delivery tracking for maximum efficiency.",
      date: "May 8, 2024",
      category: "Restaurant",
      readTime: "5 min read"
    },
    {
        title: "The Future of Digital Education Platforms",
        excerpt: "Why modern schools are moving towards unified management systems.",
        date: "May 5, 2024",
        category: "Education",
        readTime: "12 min read"
    },
    {
        title: "Building a Portfolio That Actually Converts",
        excerpt: "Design tips and tricks to showcase your work effectively.",
        date: "May 2, 2024",
        category: "Design",
        readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Disibin <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Journal</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-600">
                    Insights, tutorials, and success stories from the forefront of the digital business revolution.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {posts.map((post, i) => (
                    <Link href={`/blog/${i}`} key={i} className="group">
                        <div className="aspect-[16/9] bg-gray-100 rounded-[2.5rem] mb-8 overflow-hidden relative border border-gray-100">
                             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                             <div className="absolute top-6 left-6">
                                <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-900 uppercase tracking-widest shadow-sm">
                                    {post.category}
                                </span>
                             </div>
                        </div>
                        <div className="px-2">
                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 font-medium">
                                <span>{post.date}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                                {post.title}
                            </h2>
                            <p className="text-gray-500 leading-relaxed text-lg">
                                {post.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-24 pt-16 border-t border-gray-100 text-center">
                <button className="bg-indigo-50 text-indigo-600 font-bold px-10 py-4 rounded-2xl hover:bg-indigo-100 transition-colors">
                    Load More Articles
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
