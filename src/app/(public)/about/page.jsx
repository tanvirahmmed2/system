import React from "react";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            Our Mission is to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Empower Businesses</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Founded in 2024, Disibin started with a simple idea: that every business, regardless of size or industry, should have access to premium digital infrastructure without the complexity of traditional coding.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[3rem] shadow-2xl shadow-indigo-200 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white text-9xl font-bold opacity-10 select-none">
                        VISION
                    </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                    <p className="text-indigo-600 font-bold text-3xl mb-2">10k+</p>
                    <p className="text-gray-500 text-sm font-medium">Businesses launched worldwide using Disibin modules.</p>
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for the Modern Entrepreneur</h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                    <p>
                        We believe that the barriers to entry for starting a digital-first business are too high. Entrepreneurs spend more time fighting with software than they do serving their customers.
                    </p>
                    <p>
                        Disibin is our answer to that problem. By building modular, industry-specific "operating systems," we allow you to focus on what you do best: growing your brand.
                    </p>
                    <ul className="space-y-4 pt-4">
                        {[
                            "Zero-code customization",
                            "Integrated payment gateways",
                            "Industry-specific data models",
                            "Global edge hosting included"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 font-semibold text-gray-900">
                                <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-24 bg-gray-50/50 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Minds Behind Disibin</h2>
            <p className="text-gray-500">A global team of designers, engineers, and industry experts.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="group">
                    <div className="aspect-square bg-gray-200 rounded-[2rem] mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden border border-gray-100 shadow-sm" />
                    <h3 className="text-xl font-bold text-gray-900">Team Member</h3>
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Role Title</p>
                </div>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Ready to launch your vision?</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                Join thousands of businesses already scaling with Disibin. Start your free trial today.
            </p>
            <Link href="/register" className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl active:scale-95 relative z-10">
                Get Started Now
            </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
