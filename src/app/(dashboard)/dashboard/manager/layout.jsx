import React from "react";
import Link from "next/link";

const ManagerDashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 shadow-sm z-50">
        <div className="p-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-indigo-600">
                DISIBIN<span className="text-gray-900">.MGR</span>
            </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto pb-10">
          {[
            { name: "Dashboard", href: "/dashboard/manager", icon: "🏠" },
            { name: "Packages", href: "/dashboard/manager/packages", icon: "📦" },
            { name: "Templates", href: "/dashboard/manager/templates", icon: "🎨" },
            { name: "Blogs", href: "/dashboard/manager/blogs", icon: "📝" },
            { name: "Tenants Track", href: "/dashboard/manager/tenants", icon: "🔍" },
            { name: "Subscriptions", href: "/dashboard/manager/subscriptions", icon: "💳" },
            { name: "Payments", href: "/dashboard/manager/payments", icon: "💰" },
            { name: "Assign Task", href: "/dashboard/manager/tasks", icon: "👷" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 ml-72 p-10">
        {children}
      </main>
    </div>
  );
};

export default ManagerDashboardLayout;
