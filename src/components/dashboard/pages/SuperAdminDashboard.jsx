"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Super Admin Hub</h1>
          <p className="text-gray-500 mt-2">Full system control and platform-wide analytics.</p>
        </div>
        <div className="flex gap-3">
            <a href="/dashboard/admin/users" className="bg-gray-100 text-gray-600 font-bold px-6 py-3 rounded-2xl hover:bg-gray-200 transition-colors">
                Users
            </a>
            <a href="/dashboard/admin/purchases" className="bg-gray-100 text-gray-600 font-bold px-6 py-3 rounded-2xl hover:bg-gray-200 transition-colors">
                Purchases
            </a>
            <a href="/dashboard/admin/analytics" className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-100">
                Analytics
            </a>
        </div>
      </div>

      {/* Stats Grid */}
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
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{s.label}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{s.val}</h3>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tenant Control */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-8">Tenant Management</h2>
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                                🏢
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Tenant #{i}482</p>
                                <p className="text-xs text-gray-500 italic">business{i}.disibin.com</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-xs font-bold text-indigo-600 px-3 py-1 bg-white rounded-lg shadow-sm">Manage</button>
                            <button className="text-xs font-bold text-red-600 px-3 py-1 bg-white rounded-lg shadow-sm">Suspend</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Financial Control */}
        <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-gray-200">
            <h2 className="text-xl font-bold mb-8">Financial Operations</h2>
            <div className="space-y-8">
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Global Earnings</p>
                    <h3 className="text-4xl font-black text-white">{stats ? `$${stats.totalRevenue.toLocaleString()}` : "..."}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 rounded-2xl">
                        <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Platform Commission</p>
                        <p className="text-xl font-bold">$124k</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl">
                        <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Payout Tracking</p>
                        <p className="text-xl font-bold">$718k</p>
                    </div>
                </div>
                <button className="w-full bg-indigo-600 py-4 rounded-2xl font-bold shadow-lg">Process All Payouts</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
