"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get("/api/admin/purchases");
      if (Array.isArray(res.data)) {
        setPurchases(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch purchases:", error);
      toast.error("Failed to load purchases");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Purchase History</h1>
        <p className="text-gray-500 mt-1">Platform-wide sales and package acquisitions.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Customer</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Package</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Amount</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-medium">Loading purchases...</td>
                </tr>
              ) : purchases.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-medium">No purchases found.</td>
                </tr>
              ) : (
                purchases.map((p) => (
                  <tr key={p.purchase_id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-6 text-sm font-bold text-gray-400">#{p.purchase_id}</td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-bold text-gray-900">{p.user_name}</p>
                        <p className="text-xs text-gray-500">{p.user_email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                        {p.package_name || "N/A"}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-black text-gray-900">
                      ${parseFloat(p.amount).toFixed(2)}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        p.status === 'completed' ? 'bg-green-50 text-green-600' :
                        p.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      {new Date(p.created_at).toLocaleDateString()}
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

export default PurchaseHistory;
