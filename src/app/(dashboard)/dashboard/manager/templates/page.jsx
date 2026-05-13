"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TemplateForm from "@/components/form/TemplateForm";

const ManageTemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({
    name: "",
    slug: "",
    type: "portfolio",
    description: "",
    is_premium: false
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get("/api/manager/templates");
      if (Array.isArray(res.data)) setTemplates(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = currentTemplate.template_id ? "patch" : "post";
    const url = currentTemplate.template_id ? `/api/manager/templates/${currentTemplate.template_id}` : "/api/manager/templates";

    try {
      const res = await axios[method](url, currentTemplate);
      if (res.status === 200 || res.status === 201) {
        toast.success(`Template ${currentTemplate.template_id ? "updated" : "added"}`);
        setIsEditing(false);
        setCurrentTemplate({ name: "", slug: "", type: "portfolio", description: "", is_premium: false });
        fetchTemplates();
      }
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    }
  };

  const deleteTemplate = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(`/api/manager/templates/${id}`);
      if (res.status === 200) {
        toast.success("Template deleted");
        fetchTemplates();
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
          <h1 className="text-3xl font-extrabold text-gray-900">Site Templates</h1>
          <p className="text-gray-500 mt-2">Manage pre-built layouts for platform users.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentTemplate({ name: "", slug: "", type: "portfolio", description: "", is_premium: false });
            setIsEditing(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-100"
        >
          + Add New Template
        </button>
      </div>

      {isEditing && (
        <TemplateForm 
          currentTemplate={currentTemplate}
          setCurrentTemplate={setCurrentTemplate}
          handleSubmit={handleSubmit}
          setIsEditing={setIsEditing}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-10">Loading templates...</div>
        ) : templates.map(t => (
            <div key={t.template_id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl">🎨</div>
                    {t.is_premium && <span className="bg-amber-50 text-amber-600 text-[10px] font-black uppercase px-2 py-1 rounded">Premium</span>}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.type}</p>
                <div className="mt-8 flex gap-2">
                    <button 
                      onClick={() => { setCurrentTemplate(t); setIsEditing(true); }}
                      className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteTemplate(t.template_id)}
                      className="px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
                    >
                      Delete
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTemplatesPage;
