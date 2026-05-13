"use client";
import React, { useState } from "react";

const DeveloperTasksPage = () => {
  const [tasks] = useState([
    { id: 1, title: "Fix API latency in /tenants", priority: "High", deadline: "Today" },
    { id: 2, title: "Optimize Database Pool Singleton", priority: "Normal", deadline: "Tomorrow" },
    { id: 3, title: "Implement Brevo SMTP Logic", priority: "Critical", deadline: "ASAP" },
  ]);

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Assigned Tasks</h1>
        <p className="text-gray-500 mt-2">View and manage technical tasks delegated by the management team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map(t => (
            <div key={t.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-lg">🛠️</div>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                        t.priority === 'Critical' ? 'bg-red-50 text-red-600' : 
                        t.priority === 'High' ? 'bg-orange-50 text-orange-600' : 
                        'bg-blue-50 text-blue-600'
                    }`}>{t.priority}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{t.title}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-auto mb-6">Due: {t.deadline}</p>
                <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100">Start Task</button>
                    <button className="px-4 py-3 bg-gray-50 text-gray-400 hover:bg-gray-100 rounded-xl text-xs font-bold transition-colors">Details</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperTasksPage;
