"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SupportContactPage = () => {
  const [formData, setFormData] = useState({
    toEmail: "",
    toName: "",
    subject: "Re: Your Inquiry on Disibin",
    message: ""
  });

  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const res = await axios.post("/api/support/contact", formData);
      if (res.status === 200) {
        toast.success("Reply sent successfully via Brevo!");
        setFormData({ ...formData, message: "" });
      }
    } catch (error) {
      console.error("Failed to send reply:", error);
      toast.error(error.response?.data?.error || "Failed to send email reply.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Contact Inquiry Reply</h1>
        <p className="text-gray-500 mt-2">Reply to website inquiries directly via email using Brevo integration.</p>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
        <form onSubmit={handleSend} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Recipient Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all"
                        placeholder="customer@example.com"
                        value={formData.toEmail}
                        onChange={(e) => setFormData({...formData, toEmail: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Recipient Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all"
                        placeholder="John Doe"
                        value={formData.toName}
                        onChange={(e) => setFormData({...formData, toName: e.target.value})}
                    />
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Subject</label>
                <input 
                    type="text" 
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Reply Message</label>
                <textarea 
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all h-64"
                    placeholder="Type your response here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
            </div>

            <div className="flex justify-between items-center pt-4">
                <p className="text-xs text-gray-400 italic">Powered by Brevo SMTP Service</p>
                <button 
                    disabled={isSending}
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-12 py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all disabled:opacity-50"
                >
                    {isSending ? 'Sending Reply...' : 'Send Email Reply'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SupportContactPage;
