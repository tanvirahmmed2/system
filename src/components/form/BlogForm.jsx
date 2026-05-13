import React from "react";

const BlogForm = ({ currentBlog, setCurrentBlog, handleSubmit, setIsEditing }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-2xl shadow-indigo-50">
      <h2 className="text-xl font-bold mb-6">{currentBlog.blog_id ? "Edit" : "Create"} Blog Post</h2>
      <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Title</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                    value={currentBlog.title}
                    onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})}
                    required
                  />
              </div>
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Slug</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                    value={currentBlog.slug}
                    onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})}
                    required
                  />
              </div>
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Excerpt</label>
              <textarea 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all h-24" 
                value={currentBlog.excerpt}
                onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})}
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Content</label>
              <textarea 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all h-64" 
                value={currentBlog.content}
                onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})}
                required
              />
          </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 font-bold px-6 py-3">Cancel</button>
          <button type="submit" className="bg-indigo-600 text-white font-bold px-10 py-3 rounded-2xl shadow-lg">Save Post</button>
      </div>
    </form>
  );
};

export default BlogForm;
