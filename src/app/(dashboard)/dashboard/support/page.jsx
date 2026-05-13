"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("/api/support/tickets");
      if (Array.isArray(res.data)) {
        setTickets(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      toast.error("Failed to load support tickets");
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(t => filter === "all" ? true : t.status === filter);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Support Tickets</h1>
          <p className="text-gray-500 mt-1">Manage user inquiries and platform issues.</p>
        </div>
        <div className="flex gap-2">
            <select 
                className="px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none font-bold text-sm shadow-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
            </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">ID</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Subject / User</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Priority</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-medium">Loading tickets...</td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-medium">No tickets found.</td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.ticket_id} className="hover:bg-gray-50/30 transition-colors group cursor-pointer" onClick={() => window.location.href = `/dashboard/support/tickets/${t.ticket_id}`}>
                    <td className="px-8 py-6 text-sm font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">#{t.ticket_id}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{t.subject}</p>
                      <p className="text-sm text-gray-500">{t.user_name} • {t.user_email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        t.priority === 'urgent' ? 'bg-red-50 text-red-600' :
                        t.priority === 'high' ? 'bg-orange-50 text-orange-600' :
                        t.priority === 'medium' ? 'bg-blue-50 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        t.status === 'open' ? 'bg-amber-50 text-amber-600' :
                        t.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
                        t.status === 'resolved' ? 'bg-green-50 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {t.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right text-sm text-gray-500">
                      {new Date(t.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
