import React from "react";

const RegisterForm = ({ formData, setFormData, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">
          Full Name
        </label>
        <input
          type="text"
          required
          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">
          Email Address
        </label>
        <input
          type="email"
          required
          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">
          Password
        </label>
        <input
          type="password"
          required
          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 px-1">
          Confirm Password
        </label>
        <input
          type="password"
          required
          className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
