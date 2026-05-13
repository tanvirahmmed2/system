import React from "react";

const PackageForm = ({ currentPackage, setCurrentPackage, handleSubmit, setIsEditing }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-2xl shadow-indigo-50">
      <h2 className="text-xl font-bold mb-6">{currentPackage.package_id ? "Edit" : "Create"} Package</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Package Name</label>
              <input 
                type="text" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                placeholder="e.g. Pro Plan"
                value={currentPackage.name}
                onChange={e => setCurrentPackage({...currentPackage, name: e.target.value})}
                required
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Slug</label>
              <input 
                type="text" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                placeholder="pro-plan"
                value={currentPackage.slug}
                onChange={e => setCurrentPackage({...currentPackage, slug: e.target.value})}
                required
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Price ($)</label>
              <input 
                type="number" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                value={currentPackage.price}
                onChange={e => setCurrentPackage({...currentPackage, price: parseFloat(e.target.value)})}
                required
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Category</label>
              <select 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-600 transition-all" 
                value={currentPackage.category}
                onChange={e => setCurrentPackage({...currentPackage, category: e.target.value})}
              >
                <option value="ecommerce">E-commerce</option>
                <option value="restaurant">Restaurant</option>
                <option value="school">School</option>
                <option value="hospital">Hospital</option>
                <option value="portfolio">Portfolio</option>
                <option value="service">Service</option>
              </select>
          </div>
      </div>
      <div className="flex justify-end gap-4">
          <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 font-bold px-6 py-3">Cancel</button>
          <button type="submit" className="bg-indigo-600 text-white font-bold px-10 py-3 rounded-2xl shadow-lg">Save Package</button>
      </div>
    </form>
  );
};

export default PackageForm;
