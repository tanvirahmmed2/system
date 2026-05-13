"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get("/api/manager/subscriptions");
      if (Array.isArray(res.data)) setSubscriptions(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Subscriptions</h1>
        <p className="text-gray-500 mt-2">Manage active plans and billing cycles.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">User / Tenant</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Plan</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Expiry</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="4" className="px-8 py-10 text-center">Loading subscriptions...</td></tr>
                ) : subscriptions.map(sub => (
                    <tr key={sub.subscription_id}>
                        <td className="px-8 py-6">
                            <p className="font-bold text-gray-900">{sub.user_name}</p>
                            <p className="text-xs text-indigo-600 font-bold">{sub.tenant_name}</p>
                        </td>
                        <td className="px-8 py-6">
                            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-lg">{sub.package_name}</span>
                        </td>
                        <td className="px-8 py-6">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                                sub.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}>{sub.status}</span>
                        </td>
                        <td className="px-8 py-6 text-right text-sm text-gray-500">
                            {new Date(sub.current_period_end).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSubscriptionsPage;
