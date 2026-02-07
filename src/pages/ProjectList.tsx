import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Project = {
  id: number;
  name: string;
};

export default function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  /* ---------------- FETCH PROJECTS ---------------- */
  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:5000/api/projects/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch projects error:", err);
        setLoading(false);
      });
  }, [user?.id]);

  /* ---------------- CREATE PROJECT ---------------- */
  const createProject = async () => {
    const name = prompt("Enter project name");
    if (!name) return;

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (data.projectId) {
        navigate(`/projects/${data.projectId}`);
      }
    } catch (err) {
      console.error("Create project error:", err);
      alert("Failed to create project");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ marginBottom: "20px" }}>Your workflows</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {/* CREATE PROJECT CARD */}
        <div
          onClick={createProject}
          style={{
            border: "2px dashed #cbd5e1",
            borderRadius: "10px",
            padding: "24px",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: 500,
            color: "#475569",
          }}
        >
          + Create blank project
        </div>

        {/* EXISTING PROJECTS */}
        {!loading &&
          projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "20px",
                cursor: "pointer",
                background: "#fff",
                fontWeight: 500,
              }}
            >
              {project.name}
            </div>
          ))}
      </div>

      {loading && <p style={{ marginTop: 20 }}>Loading projects...</p>}
    </div>
  );
}
