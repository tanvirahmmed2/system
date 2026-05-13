import React from "react";

const DeveloperDashboard = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">System Developer</h1>
        <p className="text-gray-500 mt-2">Manage the builder engine, block registry, and system logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Global Traffic Monitor */}
        <div className="lg:col-span-2 bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-gray-200">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold">Global Traffic Monitor</h2>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 text-[10px] font-bold rounded-full">NORMAL</span>
                </div>
            </div>
            <div className="h-48 flex items-end gap-1">
                {[20, 40, 30, 80, 50, 90, 70, 40, 60, 30, 50, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500 transition-all" style={{ height: `${h}%` }} />
                ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-4 text-center font-bold uppercase tracking-widest">Real-time platform throughput (nodes 1-12)</p>
        </div>

        {/* System Health */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-8">System Health</h2>
            <div className="space-y-6">
                {[
                    { label: "API Gateway", status: "Healthy", color: "green" },
                    { label: "Worker Nodes", status: "Loaded", color: "orange" },
                    { label: "DB Connection", status: "Healthy", color: "green" },
                    { label: "Cache Layer", status: "Healthy", color: "green" }
                ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-600">{s.label}</span>
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full bg-${s.color}-500`} />
                            <span className={`text-xs font-bold text-${s.color}-600`}>{s.status}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-10 py-4 border-2 border-dashed border-gray-100 text-gray-400 font-bold text-sm rounded-2xl hover:border-indigo-300 hover:text-indigo-600 transition-all">
                Run Diagnostic Tool
            </button>
        </div>
      </div>

      {/* Deployment Logs */}
      <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Deployment Activity</h3>
        <div className="space-y-3 font-mono text-[11px] leading-relaxed">
            <p className="text-gray-500"><span className="text-green-600">[SUCCESS]</span> 2026-05-12 04:12:01 - Deployment of builder-engine v1.4.2 successful.</p>
            <p className="text-gray-500"><span className="text-blue-600">[INFO]</span> 2026-05-12 03:45:12 - Cache invalidated for 'all_tenants'.</p>
            <p className="text-gray-500"><span className="text-orange-600">[WARN]</span> 2026-05-12 02:22:15 - Latency spike detected in US-EAST-1 cluster.</p>
            <p className="text-gray-500"><span className="text-indigo-600">[SYSTEM]</span> 2026-05-12 00:00:00 - Routine database backup completed.</p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
