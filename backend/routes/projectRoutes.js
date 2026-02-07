const express = require("express");
const router = express.Router();
const db = require("../db");

/* ===============================
   CREATE PROJECT (GROUP-READY)
================================ */
router.post("/", (req, res) => {
  const { name, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: "Missing project name or user" });
  }

  // 1️⃣ Create project
  const projectSql =
    "INSERT INTO projects (name, user_id) VALUES (?, ?)";

  db.query(projectSql, [name, userId], (err, result) => {
    if (err) {
      console.error("CREATE PROJECT ERROR:", err);
      return res.status(500).json({ message: "Failed to create project" });
    }

    const projectId = result.insertId;

    // 2️⃣ Add creator as ADMIN in project_members
    const memberSql =
      "INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, 'admin')";

    db.query(memberSql, [projectId, userId], (err) => {
      if (err) {
        console.error("ADD MEMBER ERROR:", err);
        return res.status(500).json({ message: "Failed to attach project member" });
      }

      res.json({
        message: "Project created",
        projectId,
      });
    });
  });
});

/* ===============================
   GET PROJECTS (GROUP LOGIC)
================================ */
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT p.*
    FROM projects p
    JOIN project_members pm ON p.id = pm.project_id
    WHERE pm.user_id = ?
    ORDER BY p.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("FETCH PROJECTS ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch projects" });
    }

    res.json(results);
  });
});
const {
  addMemberToProject,
  getProjectMembers,
} = require("../controllers/projectController");

router.post("/:projectId/members", addMemberToProject);
router.get("/:projectId/members", getProjectMembers);


module.exports = router;
