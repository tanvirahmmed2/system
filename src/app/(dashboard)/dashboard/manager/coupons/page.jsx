"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import CouponForm from "@/components/form/CouponForm";

const ManageCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    code: "",
    title: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    package_id: "",
    minimum_amount: 0,
    usage_limit: "",
    usage_per_user: 1,
    starts_at: "",
    expires_at: "",
    is_active: true
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [couponsRes, packagesRes] = await Promise.all([
        axios.get("/api/manager/coupons"),
        axios.get("/api/manager/packages")
      ]);
      setCoupons(Array.isArray(couponsRes.data) ? couponsRes.data : []);
      setPackages(Array.isArray(packagesRes.data) ? packagesRes.data : []);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (coupon = null) => {
    if (coupon) {
      setEditingId(coupon.coupon_id);
      setFormData({
        ...coupon,
        package_id: coupon.package_id || "",
        starts_at: coupon.starts_at ? new Date(coupon.starts_at).toISOString().split('T')[0] : "",
        expires_at: coupon.expires_at ? new Date(coupon.expires_at).toISOString().split('T')[0] : "",
      });
    } else {
      setEditingId(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
        discount_value: parseFloat(formData.discount_value),
        minimum_amount: parseFloat(formData.minimum_amount || 0)
      };

      if (editingId) {
        await axios.put(`/api/manager/coupons/${editingId}`, payload);
        toast.success("Coupon updated successfully");
      } else {
        await axios.post("/api/manager/coupons", payload);
        toast.success("Coupon created successfully");
      }
      closeModal();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this coupon? This action cannot be undone.")) {
      try {
        await axios.delete(`/api/manager/coupons/${id}`);
        toast.success("Coupon deleted");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete coupon");
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Manage Coupons</h1>
          <p className="text-gray-500 mt-1">Create and manage discount codes for your platform.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span> New Coupon
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Code</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Discount</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Usage</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-medium">Loading coupons...</td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-medium">No coupons found. Click "New Coupon" to add one.</td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.coupon_id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-lg text-indigo-600 uppercase tracking-wider">{coupon.code}</p>
                      <p className="text-sm text-gray-500 font-medium">{coupon.title || 'No Title'}</p>
                      {coupon.package_name && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold mt-1 inline-block">For: {coupon.package_name}</span>}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-gray-900 text-lg">
                        {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `$${coupon.discount_value}`}
                      </p>
                      <p className="text-xs text-gray-400">Min. spend: ${coupon.minimum_amount}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-gray-700 font-bold">{coupon.used_count} {coupon.usage_limit ? `/ ${coupon.usage_limit}` : 'uses'}</p>
                      {coupon.expires_at && <p className="text-xs text-red-400 mt-1">Exp: {new Date(coupon.expires_at).toLocaleDateString()}</p>}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${coupon.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(coupon)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          ✎
                        </button>
                        <button onClick={() => handleDelete(coupon.coupon_id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-black text-gray-900">{editingId ? 'Edit Coupon' : 'Create New Coupon'}</h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-colors font-bold">✕</button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1">
              <CouponForm 
                formData={formData}
                setFormData={setFormData}
                packages={packages}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                editingId={editingId}
                onCancel={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCouponsPage;
