import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectTasks = () => {
  const navigate = useNavigate();

  const [projectType, setProjectType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [goal, setGoal] = useState("");
  const [workflow, setWorkflow] = useState("");

  const isValid = projectType && teamSize;

  const handleFinish = () => {
    const onboardingData = {
      projectType,
      teamSize,
      goal,
      workflow,
    };

    // Save onboarding preferences (temporary: localStorage)
    localStorage.setItem(
      "onboardingPreferences",
      JSON.stringify(onboardingData)
    );

    // Mark onboarding complete
    localStorage.setItem("hasOnboarded", "true");

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[#F5F7FB]">
      {/* ================= LEFT SIDE ================= */}
      <div className="w-full md:w-[38%] bg-white px-10 py-12 flex flex-col justify-center">
        {/* Progress */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div className="h-2 w-full bg-blue-600 rounded-full" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          A few final details
        </h1>

        <p className="text-gray-600 mb-8">
          Help us personalize your workspace experience.
        </p>

        <div className="space-y-5">
          {/* Project Type */}
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select project type</option>
            <option value="Software development">Software development</option>
            <option value="Marketing campaign">Marketing campaign</option>
            <option value="Academic project">Academic project</option>
            <option value="Client work">Client work</option>
            <option value="Personal project">Personal project</option>
          </select>

          {/* Team Size */}
          <select
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select team size</option>
            <option value="Just me">Just me</option>
            <option value="2–5 people">2–5 people</option>
            <option value="6–10 people">6–10 people</option>
            <option value="10+ people">10+ people</option>
          </select>

          {/* Goal */}
          <input
            type="text"
            placeholder="Primary goal (e.g. Deliver on time)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Workflow */}
          <select
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Preferred workflow</option>
            <option value="Kanban boards">Kanban boards</option>
            <option value="Task lists">Task lists</option>
            <option value="Timeline based">Timeline based</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <button
          disabled={!isValid}
          onClick={handleFinish}
          className="mt-8 w-fit bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Finish setup →
        </button>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="hidden md:flex w-[62%] bg-[#EEF2FF] items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-[640px] p-8">
          {/* Browser dots */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-3.5 h-3.5 rounded-full bg-red-400" />
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
            <span className="w-3.5 h-3.5 rounded-full bg-green-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Workspace preview
          </h2>

          <div className="space-y-4 text-gray-700 text-sm">
            <p>
              <strong>Project type:</strong> {projectType || "—"}
            </p>
            <p>
              <strong>Team size:</strong> {teamSize || "—"}
            </p>
            <p>
              <strong>Goal:</strong> {goal || "—"}
            </p>
            <p>
              <strong>Workflow:</strong> {workflow || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTasks;
