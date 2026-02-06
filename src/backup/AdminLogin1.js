import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://geo-track-1.onrender.com";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "NoCompanyAssigned") {
          throw new Error("Your account is not assigned to any company. Contact super admin.");
        }
        if (data.error === "CompanyInactive") {
          throw new Error("Your company account is inactive. Contact super admin.");
        }
        throw new Error(data.message || "Invalid email or password");
      }

      const { token, user } = data;
      const payload = JSON.parse(atob(token.split(".")[1]));
      
      if (!payload.isAdmin && !payload.isSuperAdmin) {
        throw new Error("You are not authorized to access the admin dashboard.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.fullName || "");
      localStorage.setItem("isAdmin", user.isAdmin ? "true" : "false");
      localStorage.setItem("isSuperAdmin", user.isSuperAdmin ? "true" : "false");
      localStorage.setItem("companyId", user.companyId || "");
      localStorage.setItem("companyName", user.companyName || "");
      localStorage.setItem("companySubdomain", user.companySubdomain || "");

      console.log("✅ Login successful:", {
        email: user.email,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin,
        companyId: user.companyId,
        companyName: user.companyName
      });

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
      console.error("❌ Login error:", err);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Video Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        {/* Video Background - Flipped Horizontally */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        >
          <source src="/left.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Optional: Gradient overlay for extra styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-cyan-500/30"></div>

        {/* Content on top of video */}
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg"></h1>
            <p className="text-xl opacity-90 drop-shadow-lg"></p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-950 p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">Admin Login</h2>
            <p className="text-gray-400">Enter authorised credentials to proceed</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-4 mb-6 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder=""
                className="w-full px-4 py-3.5 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder=""
                className="w-full px-4 py-3.5 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Reset Password
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/50 hover:shadow-blue-600/75"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500">Powered by Averlon</p>
          </div>
        </div>
      </div>
    </div>
  );
}