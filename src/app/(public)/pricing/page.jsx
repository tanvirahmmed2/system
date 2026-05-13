import React from "react";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

const PricingCard = ({ plan, featured }) => (
  <div
    className={`p-8 rounded-[2.5rem] border ${
      featured
        ? "bg-indigo-600 text-white border-indigo-600 shadow-2xl shadow-indigo-200 ring-8 ring-indigo-50"
        : "bg-white text-gray-900 border-gray-100 shadow-sm"
    } transition-all hover:-translate-y-2 flex flex-col`}
  >
    {featured && (
      <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-6">
        Most Popular
      </span>
    )}
    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-extrabold">${plan.price}</span>
      <span className={featured ? "text-indigo-200" : "text-gray-500"}>/month</span>
    </div>
    <p className={`text-sm mb-8 ${featured ? "text-indigo-100" : "text-gray-500"}`}>
        {plan.description}
    </p>
    <ul className="space-y-4 mb-10 flex-1">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${featured ? 'bg-indigo-500' : 'bg-indigo-50 text-indigo-600'}`}>
            ✓
          </span>
          <span className="text-sm font-medium">{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      href="/register"
      className={`w-full py-4 rounded-2xl font-bold text-center transition-all ${
        featured
          ? "bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100"
      }`}
    >
      Choose {plan.name}
    </Link>
  </div>
);

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for freelancers and individual portfolios.",
      features: ["1 Website", "Standard Templates", "Basic Analytics", "Community Support", "SSL Certificate"],
    },
    {
      name: "Business",
      price: 79,
      description: "Ideal for small businesses and growing shops.",
      features: ["3 Websites", "Premium Industry Templates", "Advanced SEO Tools", "Priority Support", "Custom Domain", "Inventory Management"],
    },
    {
      name: "Enterprise",
      price: 199,
      description: "For large scale operations and multi-industry empires.",
      features: ["Unlimited Websites", "All Industry Modules", "White-label Options", "Dedicated Manager", "API Access", "Custom Integrations"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Transparent, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Simple Pricing</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Launch your business in minutes. Choose the plan that scales with you. 
            No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
          <PricingCard plan={plans[0]} />
          <PricingCard plan={plans[1]} featured={true} />
          <PricingCard plan={plans[2]} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-gray-100 px-4">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-8">
                {[
                    { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time from your dashboard." },
                    { q: "What industry modules are included?", a: "The Business and Enterprise plans include specialized modules for E-commerce, Restaurants, Schools, and more." },
                    { q: "Do I need my own hosting?", a: "No, all plans include secure, high-speed hosting on our global edge network." }
                ].map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {item.q}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
