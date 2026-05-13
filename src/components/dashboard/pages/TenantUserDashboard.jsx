import React from "react";
import Link from "next/link";

const TenantUserDashboard = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Welcome to Disibin</h1>
          <p className="text-gray-500 mt-2">Manage your websites, domains, and grow your digital presence.</p>
        </div>
        <button className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-2xl shadow-xl shadow-indigo-100 hover:-translate-y-1 transition-all">
          + New Website
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { label: "Total Visitors", val: "12,482", trend: "+12%", icon: "👥" },
            { label: "Average Clicks", val: "4,102", trend: "+8.5%", icon: "🖱️" },
            { label: "Conversions", val: "342", trend: "+5.1%", icon: "🎯" }
        ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">{s.trend}</span>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{s.val}</h3>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Website List */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold px-2">Active Websites</h2>
            {[
                { name: "My Store", domain: "store.disibin.com", status: "Published", type: "E-com" },
                { name: "Portfolio", domain: "alex.disibin.com", status: "Draft", type: "Portf" }
            ].map((site, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-indigo-50 transition-colors">
                            🌐
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{site.name}</h3>
                            <p className="text-xs text-gray-500">{site.domain}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{site.type}</p>
                            <p className={`text-xs font-bold ${site.status === 'Published' ? 'text-green-500' : 'text-orange-500'}`}>{site.status}</p>
                        </div>
                        <button className="bg-gray-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all">
                            Site Settings
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Subscription Sidebar */}
        <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 h-fit">
            <h3 className="text-lg font-bold mb-6">Subscription</h3>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-6">
                <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Current Plan</p>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Starter Plan</h4>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Usage</span>
                    <span>1 of 1 site</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-full" />
                </div>
            </div>
            <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl text-sm mb-4">Upgrade Plan</button>
            <p className="text-center text-[10px] text-gray-400">Next billing on June 12, 2026</p>
        </div>
      </div>
    </div>
  );
};

export default TenantUserDashboard;
