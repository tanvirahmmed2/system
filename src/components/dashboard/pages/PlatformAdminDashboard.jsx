import React from "react";

const PlatformAdminDashboard = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Platform Admin</h1>
        <p className="text-gray-500 mt-2">Operational control, billing plans, and marketing content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Control */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold">Subscription Plans</h2>
                <button className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl">+ Create Plan</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Starter', 'Business', 'Enterprise'].map(plan => (
                    <div key={plan} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <h3 className="font-bold mb-2">{plan}</h3>
                        <p className="text-2xl font-black text-indigo-600 mb-4">$XX</p>
                        <button className="text-[10px] font-bold text-gray-500 uppercase hover:text-indigo-600">Edit Plan</button>
                    </div>
                ))}
            </div>
        </div>

        {/* Marketing/Content */}
        <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
            <h2 className="text-xl font-bold text-indigo-900 mb-6">Marketing</h2>
            <div className="space-y-4">
                <button className="w-full bg-white p-4 rounded-2xl text-left border border-indigo-100 hover:shadow-md transition-all">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">New Announcement</p>
                    <p className="text-sm font-medium">Update users on new features</p>
                </button>
                <button className="w-full bg-white p-4 rounded-2xl text-left border border-indigo-100 hover:shadow-md transition-all">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">Blog Management</p>
                    <p className="text-sm font-medium">Create/Edit journal posts</p>
                </button>
            </div>
        </div>
      </div>

      {/* Usage Monitoring */}
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-8">Usage & Monitoring</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: "Storage Used", val: "4.2TB", p: 64 },
                { label: "API Calls", val: "840k", p: 28 },
                { label: "CPU Load", val: "12%", p: 12 },
                { label: "Success Rate", val: "99.9%", p: 99 }
            ].map((m, i) => (
                <div key={i}>
                    <p className="text-gray-400 text-[10px] font-bold uppercase mb-2">{m.label}</p>
                    <p className="text-2xl font-black text-gray-900 mb-4">{m.val}</p>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: `${m.p}%` }} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformAdminDashboard;
