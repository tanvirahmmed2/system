"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagerOverview = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // We can reuse the admin stats for now or create a manager specific one
    axios.get("/api/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Manager Hub</h1>
        <p className="text-gray-500 mt-2 text-lg">System-wide platform management and operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: "Total Revenue", val: stats ? `$${stats.totalRevenue.toLocaleString()}` : "...", icon: "💰", color: "green" },
            { label: "Total Users", val: stats ? stats.totalUsers.toLocaleString() : "...", icon: "👤", color: "indigo" },
            { label: "Active Websites", val: stats ? stats.activeWebsites.toLocaleString() : "...", icon: "🌐", color: "blue" },
            { label: "Total Tenants", val: stats ? stats.totalTenants.toLocaleString() : "...", icon: "🏢", color: "purple" }
        ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className={`w-12 h-12 bg-${s.color}-50 rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                    {s.icon}
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{s.val}</h3>
            </div>
        ))}
      </div>

      <div className="bg-indigo-600 p-12 rounded-[3rem] text-white shadow-2xl shadow-indigo-100">
        <h2 className="text-2xl font-bold mb-4">Welcome back, Manager</h2>
        <p className="text-indigo-100 mb-8 max-w-xl">
          Everything you need to manage the DISIBIN platform is at your fingertips. 
          Use the sidebar to manage packages, templates, blogs and track platform growth.
        </p>
        <div className="flex gap-4">
            <a href="/dashboard/manager/packages" className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-2xl shadow-lg">Manage Packages</a>
            <a href="/dashboard/manager/coupons" className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-2xl shadow-lg">Manage Coupons</a>
            <a href="/dashboard/manager/blogs" className="bg-indigo-500 text-white font-bold px-8 py-3 rounded-2xl">Write Blog Post</a>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
