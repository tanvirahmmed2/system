import React from "react";

const SupportDashboard = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Customer Support</h1>
        <p className="text-gray-500 mt-2">Manage tickets, respond to inquiries, and help our users succeed.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticket Inbox */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold">Priority Tickets</h2>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full">3 OVERDUE</span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full">12 OPEN</span>
                </div>
            </div>
            <div className="space-y-6">
                {[
                    { u: "Sarah Miller", s: "Website Builder issue", t: "10m ago", p: "High" },
                    { u: "Michael Ross", s: "Domain connection", t: "25m ago", p: "Medium" },
                    { u: "Elena Gomez", s: "Billing discrepancy", t: "1h ago", p: "Urgent" }
                ].map((ticket, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-4 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400">
                                {ticket.u[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{ticket.s}</p>
                                <p className="text-xs text-gray-500">{ticket.u} • {ticket.t}</p>
                            </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                            ticket.p === 'Urgent' ? 'bg-red-100 text-red-600' : 
                            ticket.p === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                            {ticket.p}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Live Support Stats */}
        <div className="space-y-6">
            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-100">
                <h3 className="text-lg font-bold mb-4">Support Status</h3>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">8 Agents Online</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Avg. Response Time</span>
                        <span className="font-bold">2m 45s</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Resolved Today</span>
                        <span className="font-bold">142</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Internal Chat</h3>
                <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-2xl text-xs text-gray-600">
                        <p className="font-bold text-indigo-600 mb-1">Developer Admin</p>
                        <p>Working on the server lag in cluster 4. Will be fixed in 5m.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-2xl text-xs text-gray-600">
                        <p className="font-bold text-gray-900 mb-1">Manager A</p>
                        <p>Need someone to handle the refund for Tenant #812.</p>
                    </div>
                </div>
                <button className="w-full mt-6 bg-gray-900 text-white font-bold py-3 rounded-xl text-xs">Open Staff Chat</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
