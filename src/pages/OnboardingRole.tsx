import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png";

const roles = [
  "Student",
  "Business Owner",
  "Freelancer",
  "Project Manager",
  "Developer",
  "Designer",
  "Other",
];

const OnboardingRole = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    // ✅ If user logged in AND onboarding already done → dashboard
    if (
      localStorage.getItem("isLoggedIn") === "true" &&
      localStorage.getItem("hasOnboarded") === "true"
    ) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="w-full md:w-[40%] flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-10 py-14">

          <h1 className="text-4xl font-extrabold text-gray-900">
            Tell us about <br /> yourself
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            This helps us tailor your workspace for you.
          </p>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-8 w-full border border-gray-300 rounded-xl px-5 py-4"
          >
            <option value="">Select your role</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button
            disabled={!role}
            onClick={() => navigate("/onboarding/project")}
            className="mt-10 w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
          >
            Continue
          </button>

        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex w-[60%] items-center justify-center bg-[#DDD6FE]">
        <img
          src={image1}
          alt="Onboarding illustration"
          className="w-[1000px] max-w-full drop-shadow-xl"
        />
      </div>

    </div>
  );
};

export default OnboardingRole;
