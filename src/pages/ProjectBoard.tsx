import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTasksByProject,
  createTask,
  updateTaskStatus,
  assignTaskToUser,
} from "../api/taskApi";
import {
  getProjectMembers,
  addProjectMember,
} from "../api/projectApi";
import TaskCard from "../components/TaskCard";

export default function ProjectBoard() {
  const { projectId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tasks, setTasks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const loadTasks = async () => {
    const data = await getTasksByProject(Number(projectId));
    setTasks(data);
  };

  const loadMembers = async () => {
    const data = await getProjectMembers(Number(projectId));
    setMembers(data);
  };

  useEffect(() => {
    loadTasks();
    loadMembers();
  }, [projectId]);

  const handleCreateTask = async () => {
    if (!title) return alert("Task title required");

    await createTask({
      title,
      description,
      projectId: Number(projectId),
      createdBy: user.id,
    });

    setTitle("");
    setDescription("");
    loadTasks();
  };

  const handleMove = async (taskId: number, status: string) => {
    await updateTaskStatus(taskId, status);
    loadTasks();
  };

  const handleAssign = async (
    taskId: number,
    userId: number | null
  ) => {
    await assignTaskToUser(taskId, userId);
    loadTasks();
  };

  const handleAddMember = async () => {
    if (!memberEmail) return alert("Enter email");

    const res = await addProjectMember(
      Number(projectId),
      memberEmail
    );

    alert(res.message);
    setMemberEmail("");
    loadMembers();
  };

  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Project Board</h2>

      {/* ADD MEMBER */}
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <input
          className="border p-2 mr-2"
          placeholder="Add member by email"
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddMember}
        >
          + Add Member
        </button>
      </div>

      {/* CREATE TASK */}
      <div className="mb-6 bg-gray-100 p-4 rounded">
        <input
          className="border p-2 mr-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={handleCreateTask}
        >
          + Add Task
        </button>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, list]) => (
          <div key={status} className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-3 uppercase">
              {status.replace("_", " ")}
            </h3>

            {list.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                members={members}
                onMove={handleMove}
                onAssign={handleAssign}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
