"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManagePaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/api/manager/payments");
      if (Array.isArray(res.data)) setPayments(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Payment History</h1>
        <p className="text-gray-500 mt-2">Track all financial transactions across the platform.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Transaction ID</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Payer / Tenant</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Amount</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="4" className="px-8 py-10 text-center">Loading payments...</td></tr>
                ) : payments.map(p => (
                    <tr key={p.payment_id}>
                        <td className="px-8 py-6 text-sm font-bold text-gray-400">#{p.transaction_id || p.payment_id}</td>
                        <td className="px-8 py-6">
                            <p className="font-bold text-gray-900">{p.user_name}</p>
                            <p className="text-xs text-indigo-600 font-bold">{p.tenant_name}</p>
                        </td>
                        <td className="px-8 py-6 font-black text-gray-900">${parseFloat(p.amount).toLocaleString()}</td>
                        <td className="px-8 py-6 text-right">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                                p.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                            }`}>{p.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePaymentsPage;
