import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BProject = () => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="w-[40%] bg-white flex items-center px-12">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-6">
            Set up your first project
          </h1>

          <p className="text-gray-600 mb-6">
            What’s something you and your team are working on?
          </p>

          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            className="w-full border p-3 rounded mb-8"
          />

          <button
            onClick={() => navigate("/onboarding/tasks")}
            className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded"
          >
            Continue
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[60%] bg-[#F3E8FF] flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-[75%]">

          {/* Window dots */}
          <div className="flex gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-green-200 rounded-xl flex items-center justify-center text-2xl font-bold text-green-700">
              ☰
            </div>

            <h2 className="text-3xl font-bold">
              {projectName || "Project name"}
            </h2>
          </div>

          {/* Checklist */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default BProject;
