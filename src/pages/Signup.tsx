import { useState } from "react";
import { signupUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signupUser(form);
      console.log("🔥 SIGNUP RESPONSE:", res);

      if (res && res.message === "Signup successful") {
        // onboarding is ONLY for signup
        localStorage.setItem("hasOnboarded", "false");
        navigate("/onboarding/role");
      } else {
        setError(res?.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        required
      />

      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}
