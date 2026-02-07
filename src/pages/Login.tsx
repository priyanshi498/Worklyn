import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("🔵 Login button clicked", form);

  const res = await loginUser(form);

  console.log("🟢 Login API response:", res);

  if (res?.user) {
    console.log("✅ Login success, navigating to dashboard");

    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard");
  } else {
    console.log("❌ Login failed");
    alert(res?.message || "Login failed");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
}
