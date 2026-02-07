const BASE_URL = "http://localhost:5000/api/tasks";

/* GET TASKS BY PROJECT */
export const getTasksByProject = async (projectId: number) => {
  const res = await fetch(`${BASE_URL}/project/${projectId}`);
  return res.json();
};

/* CREATE TASK */
export const createTask = async (data: any) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

/* UPDATE TASK STATUS */
export const updateTaskStatus = async (
  taskId: number,
  status: string
) => {
  const res = await fetch(`${BASE_URL}/${taskId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

/* ASSIGN TASK TO USER */
export const assignTaskToUser = async (
  taskId: number,
  userId: number | null
) => {
  const res = await fetch(`${BASE_URL}/${taskId}/assign`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};
