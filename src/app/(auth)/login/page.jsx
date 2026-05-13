"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created successfully! Please log in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        router.push(data.redirect || "/dashboard/user");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 -translate-x-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-40 translate-y-1/2 translate-x-1/4" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-white/20">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Disibin</span>
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Manage your business empire</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 text-sm rounded-2xl flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <LoginForm 
            formData={formData} 
            setFormData={setFormData} 
            handleSubmit={handleSubmit} 
            isLoading={isLoading} 
          />

          <div className="mt-8 text-center text-gray-500 text-sm font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline font-bold">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
