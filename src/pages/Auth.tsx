import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") || "signin";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ SIGNUP → START ONBOARDING
  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      // onboarding should happen ONLY after signup
      localStorage.setItem("hasOnboarded", "false");
      localStorage.setItem("isLoggedIn", "true");

      navigate("/onboarding/role");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  // ✅ LOGIN → ALWAYS DASHBOARD
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      localStorage.setItem("isLoggedIn", "true");

      // 🔥 CRITICAL FIX: NEVER check onboarding on login
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border rounded-xl p-8 shadow">

        <h2 className="text-2xl font-bold mb-4">
          {mode === "signup" ? "Create account" : "Login"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {mode === "signup" && (
          <input
            placeholder="Name"
            className="w-full border p-3 rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          className="w-full border p-3 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={mode === "signup" ? handleSignup : handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded font-semibold"
        >
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>

      </div>
    </div>
  );
};

export default Auth;
