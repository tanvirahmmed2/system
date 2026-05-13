"use client";
import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post("/api/contact", formData);
      if (res.status === 201) {
        setSubmitted(true);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(error.response?.data?.error || "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
                <h1 className="text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                    We&apos;re Here to <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Help You Scale</span>
                </h1>
                <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                    Have questions about our industry modules? Need a custom enterprise solution? 
                    Our team is ready to assist you in launching your business empire.
                </p>

                <div className="space-y-8">
                    {[
                        { title: "Support", info: "support@disibin.com", icon: "📧" },
                        { title: "Sales", info: "sales@disibin.com", icon: "💼" },
                        { title: "Global HQ", info: "123 Tech Avenue, Silicon Valley, CA", icon: "📍" }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{item.title}</h3>
                                <p className="text-gray-500 font-medium">{item.info}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <p className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Connect with us</p>
                    <div className="flex gap-4">
                        {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map(social => (
                            <div key={social} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 cursor-pointer transition-all shadow-sm">
                                <span className="text-xs font-bold">{social[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-100">
                    {submitted ? (
                        <div className="text-center py-20 animate-fade-in">
                            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                                ✓
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h2>
                            <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                            <button 
                                onClick={() => setSubmitted(false)}
                                className="mt-8 text-indigo-600 font-bold hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Full Name</label>
                                    <input 
                                        type="text" required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Email</label>
                                    <input 
                                        type="email" required
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Subject</label>
                                <select 
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                >
                                    <option value="">General Inquiry</option>
                                    <option value="sales">Sales & Pricing</option>
                                    <option value="support">Technical Support</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Message</label>
                                <textarea 
                                    required
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all h-32"
                                    placeholder="How can we help?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
