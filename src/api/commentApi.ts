const BASE_URL = "http://localhost:5000/api/comments";

export const getCommentsByTask = async (taskId: number) => {
  const res = await fetch(`${BASE_URL}/task/${taskId}`);
  return res.json();
};

export const addComment = async (data: {
  taskId: number;
  userId: number;
  message: string;
}) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
