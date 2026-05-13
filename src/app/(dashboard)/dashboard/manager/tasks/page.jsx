"use client";
import React, { useState } from "react";

const AssignTasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix API latency in /tenants", dev: "Dev Alex", status: "In Progress" },
    { id: 2, title: "Implement Stripe Webhooks", dev: "Unassigned", status: "Pending" },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Task Delegation</h1>
          <p className="text-gray-500 mt-2">Assign technical tasks and monitor progress across the development team.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-100"
        >
          + Create New Task
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-2xl shadow-indigo-50">
            <h2 className="text-xl font-bold mb-6">Task Details</h2>
            <div className="space-y-6 mb-8">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Task Title</label>
                    <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" placeholder="Brief description of the work" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Assign to Developer</label>
                        <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all">
                            <option>Unassigned</option>
                            <option>Dev Alex</option>
                            <option>Dev Sarah</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Priority</label>
                        <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all">
                            <option>Normal</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <button onClick={() => setIsAdding(false)} className="text-gray-500 font-bold px-6 py-3">Cancel</button>
                <button className="bg-indigo-600 text-white font-bold px-10 py-3 rounded-2xl shadow-lg">Assign Task</button>
            </div>
        </div>
      )}

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
            <thead>
                <tr className="text-left border-b border-gray-50 bg-gray-50/50">
                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Task Title</th>
                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Developer</th>
                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="p-6"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {tasks.map(t => (
                    <tr key={t.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 text-sm font-bold text-gray-900">{t.title}</td>
                        <td className="p-6 text-sm font-medium text-gray-500">{t.dev}</td>
                        <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                t.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'
                            }`}>{t.status}</span>
                        </td>
                        <td className="p-6 text-right">
                            <button className="text-gray-400 hover:text-red-600 transition-colors">🗑️</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignTasksPage;
