import React from "react";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

const MarketingPage = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-700">
              The OS for your business is here
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.1]">
            Build Your Business Empire <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Without Writing Code
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            The all-in-one platform for E-commerce, Restaurants, Schools, and
            Portfolios. Manage inventory, orders, students, and bookings from a single
            premium dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold px-10 py-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95"
            >
              Get Started for Free
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 text-lg font-bold px-10 py-4 rounded-2xl border border-gray-200 transition-all hover:border-indigo-200 shadow-sm"
            >
              View Pricing
            </Link>
          </div>

          {/* Dashboard Preview Image Placeholder */}
          <div className="mt-20 relative max-w-5xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Visual Representation of Dashboard */}
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                    <div className="w-full h-full border border-gray-700 rounded-xl flex items-center justify-center">
                        <span className="text-gray-500 font-medium italic">Premium Dashboard Preview</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Modules Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            One Platform, Endless Possibilities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the module that fits your business needs. Each one is fully
            customizable and scales with your growth.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce",
                desc: "Full retail engine with inventory, suppliers, and multi-channel orders.",
                icon: "🛍️",
                color: "indigo",
              },
              {
                title: "Restaurants",
                desc: "Table management, KOT, and delivery tracking from one screen.",
                icon: "🍕",
                color: "orange",
              },
              {
                title: "Educational",
                desc: "Manage students, teachers, results, and library effortlessly.",
                icon: "🎓",
                color: "green",
              },
              {
                title: "Healthcare",
                desc: "Doctor schedules, appointments, and patient records simplified.",
                icon: "🏥",
                color: "blue",
              },
              {
                title: "Portfolios",
                desc: "Showcase your work with stunning, SEO-optimized galleries.",
                icon: "🎨",
                color: "pink",
              },
              {
                title: "POS Systems",
                desc: "Lightning fast point-of-sale for retail and small businesses.",
                icon: "💳",
                color: "purple",
              },
            ].map((module, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${module.color}-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {module.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {module.desc}
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-700 gap-2 group/link"
                >
                  Explore Module
                  <span className="group-hover/link:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Disibin</span>
            </div>
            <p className="text-gray-500 mb-8">
                &copy; {new Date().getFullYear()} Disibin. All rights reserved.
            </p>
            <div className="flex justify-center gap-8 text-gray-400">
                <Link href="/terms" className="hover:text-indigo-600">Terms</Link>
                <Link href="/privacy" className="hover:text-indigo-600">Privacy</Link>
                <Link href="/support" className="hover:text-indigo-600">Support</Link>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingPage;
