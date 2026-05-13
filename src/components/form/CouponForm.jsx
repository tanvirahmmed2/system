import React from "react";

const CouponForm = ({ formData, setFormData, packages, onSubmit, isSubmitting, editingId, onCancel }) => {
  return (
    <form id="couponForm" onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Coupon Code *</label>
              <input 
                  type="text" required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600 uppercase"
                  placeholder="e.g. SUMMER20"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  placeholder="Summer Sale"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
          </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Discount Type *</label>
              <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  value={formData.discount_type}
                  onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
              >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
              </select>
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Discount Value *</label>
              <input 
                  type="number" required min="0" step="0.01"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  placeholder={formData.discount_type === 'percentage' ? "e.g. 20" : "e.g. 50.00"}
                  value={formData.discount_value}
                  onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
              />
          </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Restrict to Package (Optional)</label>
              <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  value={formData.package_id}
                  onChange={(e) => setFormData({...formData, package_id: e.target.value})}
              >
                  <option value="">-- Apply to All Packages --</option>
                  {packages.map(p => (
                      <option key={p.package_id} value={p.package_id}>{p.name}</option>
                  ))}
              </select>
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Min. Purchase Amount</label>
              <input 
                  type="number" min="0" step="0.01"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  placeholder="0.00"
                  value={formData.minimum_amount}
                  onChange={(e) => setFormData({...formData, minimum_amount: e.target.value})}
              />
          </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Usage Limit</label>
              <input 
                  type="number" min="1"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  placeholder="Leave empty for unlimited"
                  value={formData.usage_limit}
                  onChange={(e) => setFormData({...formData, usage_limit: e.target.value})}
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Usage Per User</label>
              <input 
                  type="number" min="1" required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  value={formData.usage_per_user}
                  onChange={(e) => setFormData({...formData, usage_per_user: e.target.value})}
              />
          </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Starts At</label>
              <input 
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  value={formData.starts_at}
                  onChange={(e) => setFormData({...formData, starts_at: e.target.value})}
              />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Expires At</label>
              <input 
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-600"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({...formData, expires_at: e.target.value})}
              />
          </div>
      </div>

      <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer">
          <input 
              type="checkbox" 
              className="w-5 h-5 accent-indigo-600"
              checked={formData.is_active}
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
          />
          <span className="font-bold text-gray-700">Coupon is Active</span>
      </label>

      {/* Reusable form actions */}
      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        {onCancel && (
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : editingId ? 'Update Coupon' : 'Create Coupon'}
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
