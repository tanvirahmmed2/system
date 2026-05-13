import React from "react";

const TemplateForm = ({ currentTemplate, setCurrentTemplate, handleSubmit, setIsEditing }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-2xl shadow-indigo-50">
      <h2 className="text-xl font-bold mb-6">{currentTemplate.template_id ? "Edit" : "Add"} Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Name</label>
              <input 
                type="text" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                value={currentTemplate.name}
                onChange={e => setCurrentTemplate({...currentTemplate, name: e.target.value})}
                required
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Slug</label>
              <input 
                type="text" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                value={currentTemplate.slug}
                onChange={e => setCurrentTemplate({...currentTemplate, slug: e.target.value})}
                required
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Type</label>
              <select 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                value={currentTemplate.type}
                onChange={e => setCurrentTemplate({...currentTemplate, type: e.target.value})}
              >
                <option value="ecommerce">E-commerce</option>
                <option value="restaurant">Restaurant</option>
                <option value="portfolio">Portfolio</option>
                <option value="school">School</option>
                <option value="hospital">Hospital</option>
                <option value="service">Service</option>
              </select>
          </div>
          <div className="flex items-center gap-4 px-2">
              <input 
                type="checkbox" 
                id="is_premium"
                checked={currentTemplate.is_premium}
                onChange={e => setCurrentTemplate({...currentTemplate, is_premium: e.target.checked})}
              />
              <label htmlFor="is_premium" className="text-sm font-bold text-gray-700">Premium Template</label>
          </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
          <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 font-bold px-6 py-3">Cancel</button>
          <button type="submit" className="bg-indigo-600 text-white font-bold px-10 py-3 rounded-2xl shadow-lg">Save Template</button>
      </div>
    </form>
  );
};

export default TemplateForm;
