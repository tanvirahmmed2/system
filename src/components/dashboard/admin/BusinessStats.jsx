"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BusinessStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-gray-400">Loading platform statistics...</div>;
  if (!stats) return <div className="p-20 text-center text-red-400">Error loading statistics.</div>;

  const statCards = [
    { label: "Total Revenue", val: `$${stats.totalRevenue.toLocaleString()}`, icon: "💰", color: "green" },
    { label: "Total Users", val: stats.totalUsers.toLocaleString(), icon: "👤", color: "indigo" },
    { label: "Total Tenants", val: stats.totalTenants.toLocaleString(), icon: "🏢", color: "blue" },
    { label: "Active Sites", val: stats.activeWebsites.toLocaleString(), icon: "🌐", color: "purple" },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Business Analytics</h1>
        <p className="text-gray-500 mt-2 text-lg">Real-time platform growth and performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
            <div className={`w-12 h-12 bg-${s.color}-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner`}>
              {s.icon}
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{s.label}</p>
            <h3 className="text-3xl font-black text-gray-900">{s.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-8">Revenue by Category</h2>
            <div className="space-y-6">
                {stats.categoryStats && stats.categoryStats.length > 0 ? stats.categoryStats.map((cat, i) => {
                    const percentage = (cat.total / stats.totalRevenue) * 100;
                    return (
                        <div key={i}>
                            <div className="flex justify-between items-end mb-2">
                                <p className="text-sm font-bold text-gray-600 capitalize">{cat.category}</p>
                                <p className="text-xs text-gray-400 font-bold">${parseFloat(cat.total).toLocaleString()}</p>
                            </div>
                            <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${percentage}%` }} />
                            </div>
                        </div>
                    );
                }) : <p className="text-gray-400 italic">No category data available</p>}
            </div>
        </div>

        <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-gray-200">
            <h2 className="text-xl font-bold mb-8">Platform Health Check</h2>
            <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                    <div>
                        <p className="font-bold">Core API Services</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Operational • 99.9% Uptime</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl">
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                    <div>
                        <p className="font-bold">Database Clusters</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Healthy • 12ms Latency</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl opacity-50">
                    <div className="w-4 h-4 bg-amber-500 rounded-full" />
                    <div>
                        <p className="font-bold">Queue Processing</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Minor Backlog • 45 Pending</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessStats;
