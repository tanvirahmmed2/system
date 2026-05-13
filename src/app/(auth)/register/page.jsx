"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/form/RegisterForm";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        setError(data.message || "Registration failed");
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-white/20">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Disibin</span>
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">Start building your business today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <RegisterForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <div className="mt-8 text-center text-gray-500 text-sm font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline font-bold">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
