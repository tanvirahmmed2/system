"use client";
import React, { createContext, useContext } from "react";

const TenantContext = createContext(null);

export const TenantProvider = ({ website, templateSections, userContent, children }) => {
  return (
    <TenantContext.Provider value={{ website, templateSections, userContent }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
