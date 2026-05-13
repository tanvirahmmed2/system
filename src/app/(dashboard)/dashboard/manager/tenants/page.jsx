"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageTenantsPage = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await axios.get("/api/manager/tenants");
      if (Array.isArray(res.data)) setTenants(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tenants");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Tenant Tracking</h1>
        <p className="text-gray-500 mt-2">Monitor active businesses and their platform utilization.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Business Name</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Domain</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Owner</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="4" className="px-8 py-10 text-center">Loading tenants...</td></tr>
                ) : tenants.map(tenant => (
                    <tr key={tenant.tenant_id}>
                        <td className="px-8 py-6 font-bold text-gray-900">{tenant.name}</td>
                        <td className="px-8 py-6 text-sm text-gray-500">{tenant.subdomain}.disibin.com</td>
                        <td className="px-8 py-6">
                            <p className="text-sm font-bold text-gray-900">{tenant.owner_name}</p>
                            <p className="text-xs text-gray-400">{tenant.owner_email}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                                tenant.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}>{tenant.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTenantsPage;
