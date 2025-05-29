"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.message);
      } else {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.user.access_token);
        localStorage.setItem("refreshToken", result.user.refresh_token);
        localStorage.setItem("expiresAt", result.user.expires_at);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4ED7F1] to-[#A8F1FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#4ED7F1] mb-2">Welcome Back</h1>
            <p className="text-gray-500">Please sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6FE6FC] focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6FE6FC] focus:border-transparent transition duration-200"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-sm rounded-lg p-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#4ED7F1] text-white py-3 rounded-lg font-medium hover:bg-[#6FE6FC] transition duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-[#4ED7F1] hover:text-[#6FE6FC]">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}