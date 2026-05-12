"use client";

import SidebarBlock from "./SidebarBlock";

export default function Sidebar() {
  return (
    <div className="w-64 border-r p-4">
      <SidebarBlock
        type="hero"
        label="Hero Section"
      />

      <SidebarBlock
        type="text"
        label="Text Block"
      />

      <SidebarBlock
        type="pricing"
        label="Pricing Section"
      />
    </div>
  );
}