import React from "react";

const ManagerDashboard = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Operations Manager</h1>
        <p className="text-gray-500 mt-2">Manage purchases, moderate transactions, and control package lifecycles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Purchases & Orders */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold">Recent Purchases</h2>
                <button className="text-indigo-600 text-sm font-bold hover:underline">View All Orders</button>
            </div>
            <div className="space-y-4">
                {[
                    { id: "#ORD-841", u: "User A", amt: "$29.00", s: "Completed" },
                    { id: "#ORD-842", u: "User B", amt: "$79.00", s: "Pending" },
                    { id: "#ORD-843", u: "User C", amt: "$199.00", s: "Flagged" }
                ].map((o, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🛒</span>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{o.id} • {o.u}</p>
                                <p className="text-xs text-gray-500">{o.amt}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            o.s === 'Completed' ? 'bg-green-100 text-green-600' : 
                            o.s === 'Flagged' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                            {o.s}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Reports & Growth */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold mb-2">Sales Performance</h2>
                <p className="text-gray-500 text-sm">Monthly growth and conversion tracking.</p>
            </div>
            <div className="py-10 flex items-center justify-center">
                {/* Visual representation of a chart */}
                <div className="flex items-end gap-2 h-32 w-full max-w-xs">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-100 rounded-t-lg group relative hover:bg-indigo-600 transition-colors" style={{ height: `${h}%` }}>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Week {i+1}: {h}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-8 border-t border-gray-50 flex justify-between text-center">
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Growth</p>
                    <p className="text-lg font-black text-green-500">+14.2%</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Converted</p>
                    <p className="text-lg font-black text-gray-900">1,240</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Churn</p>
                    <p className="text-lg font-black text-red-500">2.1%</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
