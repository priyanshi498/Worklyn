
const BASE_URL = "http://localhost:5000/api/projects";

/* GET MEMBERS OF A PROJECT */
export const getProjectMembers = async (projectId: number) => {
  const res = await fetch(`${BASE_URL}/${projectId}/members`);
  return res.json();
};

/* ADD MEMBER TO PROJECT */
export const addProjectMember = async (
  projectId: number,
  email: string
) => {
  const res = await fetch(`${BASE_URL}/${projectId}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return res.json();
};
