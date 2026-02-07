import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      

      {/* ===== SIDEBAR ===== */}
      <aside className="relative z-10 w-64 bg-[#1F2937] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">
          ProjectFlow
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
          >
            📁 Projects
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700 text-sm">
          Logged in as <br />
          <span className="font-semibold">{userName}</span>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative z-10 flex-1">

        {/* TOP BAR */}
        <div className="bg-white px-8 py-4 shadow flex justify-between items-center">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-1/2 border rounded px-4 py-2 text-sm"
          />

          <div className="flex items-center gap-4">
            <span className="text-gray-600">{userName}</span>
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {userName} 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your projects and stay organized
          </p>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

            <div
              onClick={() => navigate("/projects")}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg cursor-pointer transition"
            >
              <h2 className="text-lg font-semibold">Your Projects</h2>
              <p className="text-sm text-gray-500 mt-2">
                View, create, and manage all projects
              </p>
            </div>

            <div
              onClick={() => navigate("/projects")}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg cursor-pointer transition"
            >
              <h2 className="text-lg font-semibold">Create New Project</h2>
              <p className="text-sm text-gray-500 mt-2">
                Start a new workflow in seconds
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold">Workspace Tips</h2>
              <ul className="text-sm text-gray-500 mt-2 list-disc list-inside">
                <li>Create small, focused tasks</li>
                <li>Assign tasks to teammates</li>
                <li>Move tasks across the board</li>
              </ul>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
