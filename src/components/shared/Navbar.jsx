"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Disibin
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
