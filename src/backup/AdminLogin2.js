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
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      >s
        <source src="/left.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for better contrast and glassmorphism effect */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered Glassmorphism Login Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Enhanced Glassmorphism Card */}
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 md:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Admin Login</h2>
              <p className="text-gray-100 drop-shadow-md">Enter authorised credentials to proceed</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-md border border-red-400/50 text-red-100 text-sm p-4 mb-6 rounded-xl shadow-lg">
                {error}
              </div>
            )}

            {/* Form */}
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
                  Email
                </label>
                <input
                  type="email"
                  placeholder=""
                  className="w-full px-4 py-3.5 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/10 transition-all shadow-inner"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
                  Password
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-full px-4 py-3.5 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/30 focus:bg-white/10 transition-all shadow-inner"
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
                  className="text-sm text-gray-100 hover:text-white transition-colors drop-shadow-md"
                >
                  Reset Password
                </Link>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600/90 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_24px_0_rgba(59,130,246,0.5)] hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.7)] backdrop-blur-sm"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-200 drop-shadow-md">Powered by Averlon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}