"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const promoteUser = async (userId, newRole) => {
    try {
      const res = await axios.patch("/api/admin/users", { user_id: userId, new_role: newRole });
      if (res.status === 200) {
        toast.success("User role updated");
        fetchUsers(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage platform users and their access levels.</p>
        </div>
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-6 py-3 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">User</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Role</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Joined</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-medium">Loading users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-medium">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-red-50 text-red-600' :
                        user.role === 'manager' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <select 
                        className="bg-white border border-gray-100 rounded-lg text-xs font-bold px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                        value={user.role}
                        onChange={(e) => promoteUser(user.user_id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="support">Support</option>
                        <option value="developer">Developer</option>
                        <option value="admin">Admin</option>
                      </select>
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

export default UserManagement;
