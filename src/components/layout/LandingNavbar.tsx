import { Link } from "react-router-dom";

interface LandingNavbarProps {
  loginHref: string;
  signupHref: string;
}

const LandingNavbar = ({ loginHref, signupHref }: LandingNavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* LOGO */}
      <h1 className="text-xl font-bold text-[#5B21B6]">
        ProjectManager
      </h1>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <Link
          to={loginHref}
          className="text-[#5B21B6] font-medium hover:underline"
        >
          Login
        </Link>

        <Link
          to={signupHref}
          className="rounded-lg bg-[#6D28D9] px-4 py-2 text-white font-medium hover:bg-[#5B21B6]"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
