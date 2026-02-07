const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET MEMBERS OF A PROJECT */
router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;

  const sql = `
    SELECT users.id, users.name, users.email, project_members.role
    FROM project_members
    JOIN users ON users.id = project_members.user_id
    WHERE project_members.project_id = ?
  `;

  db.query(sql, [projectId], (err, results) => {
    if (err) {
      console.error("FETCH MEMBERS ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch members" });
    }
    res.json(results);
  });
});

module.exports = router;
