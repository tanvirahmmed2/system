"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PackageForm from "@/components/form/PackageForm";

const ManagePackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    setup_fee: 0,
    duration_days: 30,
    is_lifetime: false,
    category: "service"
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get("/api/manager/packages");
      if (Array.isArray(res.data)) setPackages(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = currentPackage.package_id ? "patch" : "post";
    const url = currentPackage.package_id ? `/api/manager/packages/${currentPackage.package_id}` : "/api/manager/packages";

    try {
      const res = await axios[method](url, currentPackage);
      if (res.status === 200 || res.status === 201) {
        toast.success(`Package ${currentPackage.package_id ? "updated" : "created"}`);
        setIsEditing(false);
        setCurrentPackage({ name: "", slug: "", description: "", price: 0, setup_fee: 0, duration_days: 30, is_lifetime: false, category: "service" });
        fetchPackages();
      }
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    }
  };

  const deletePackage = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(`/api/manager/packages/${id}`);
      if (res.status === 200) {
        toast.success("Package deleted");
        fetchPackages();
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Platform Packages</h1>
          <p className="text-gray-500 mt-2">Manage subscription tiers, pricing, and feature limits.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentPackage({ name: "", slug: "", description: "", price: 0, setup_fee: 0, duration_days: 30, is_lifetime: false, category: "service" });
            setIsEditing(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-100"
        >
          + Create New Package
        </button>
      </div>

      {isEditing && (
        <PackageForm 
          currentPackage={currentPackage} 
          setCurrentPackage={setCurrentPackage} 
          handleSubmit={handleSubmit} 
          setIsEditing={setIsEditing} 
        />
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading packages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(p => (
              <div key={p.package_id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl">📦</div>
                      <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-green-50 text-green-600">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                  <p className="text-3xl font-black text-indigo-600 mb-8">${p.price}<span className="text-sm text-gray-400 font-medium">/mo</span></p>
                  <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setCurrentPackage(p);
                          setIsEditing(true);
                        }}
                        className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deletePackage(p.package_id)}
                        className="px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
                      >
                        Delete
                      </button>
                  </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePackagesPage;
