import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        userId: user.id,
      }),
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F6F4FF] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-6">Create Project</h1>

        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name"
          className="border p-3 rounded w-full mb-4"
        />

        <button className="bg-purple-600 text-white w-full py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
