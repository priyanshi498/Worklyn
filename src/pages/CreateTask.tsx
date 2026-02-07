import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  // fetch projects for dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !projectId) return;

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        projectId,
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
        <h1 className="text-2xl font-bold mb-6">Create Task</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-3 rounded w-full mb-4"
        />

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <button className="bg-purple-600 text-white w-full py-2 rounded">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
