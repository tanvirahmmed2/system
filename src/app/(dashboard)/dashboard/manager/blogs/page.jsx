"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BlogForm from "@/components/form/BlogForm";

const ManageBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    status: "published"
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/manager/blogs");
      if (Array.isArray(res.data)) setBlogs(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = currentBlog.blog_id ? "patch" : "post";
    const url = currentBlog.blog_id ? `/api/manager/blogs/${currentBlog.blog_id}` : "/api/manager/blogs";

    try {
      const res = await axios[method](url, currentBlog);
      if (res.status === 200 || res.status === 201) {
        toast.success(`Post ${currentBlog.blog_id ? "updated" : "created"}`);
        setIsEditing(false);
        setCurrentBlog({ title: "", slug: "", content: "", excerpt: "", category: "", status: "published" });
        fetchBlogs();
      }
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(`/api/manager/blogs/${id}`);
      if (res.status === 200) {
        toast.success("Post deleted");
        fetchBlogs();
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
          <h1 className="text-3xl font-extrabold text-gray-900">Platform Blogs</h1>
          <p className="text-gray-500 mt-2">Create and manage content for the main website.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentBlog({ title: "", slug: "", content: "", excerpt: "", category: "", status: "published" });
            setIsEditing(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-100"
        >
          + Create New Post
        </button>
      </div>

      {isEditing && (
        <BlogForm 
          currentBlog={currentBlog}
          setCurrentBlog={setCurrentBlog}
          handleSubmit={handleSubmit}
          setIsEditing={setIsEditing}
        />
      )}

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Blog Post</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="3" className="px-8 py-10 text-center">Loading blogs...</td></tr>
                ) : blogs.map(blog => (
                    <tr key={blog.blog_id}>
                        <td className="px-8 py-6 font-bold text-gray-900">{blog.title}</td>
                        <td className="px-8 py-6">
                            <span className="bg-green-50 text-green-600 text-[10px] font-black uppercase px-2 py-1 rounded">{blog.status}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                            <button 
                              onClick={() => { setCurrentBlog(blog); setIsEditing(true); }}
                              className="text-xs font-bold text-indigo-600"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteBlog(blog.blog_id)}
                              className="text-xs font-bold text-red-600"
                            >
                              Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogsPage;
