const db = require("../db");

/* ===============================
   CREATE PROJECT
================================ */
exports.createProject = (req, res) => {
  const { name, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: "Missing data" });
  }

  // 1️⃣ Insert project
  const projectSql = "INSERT INTO projects (name, user_id) VALUES (?, ?)";

  db.query(projectSql, [name, userId], (err, result) => {
    if (err) {
      console.error("CREATE PROJECT ERROR:", err);
      return res.status(500).json({ message: "Project creation failed" });
    }

    const projectId = result.insertId;

    // 2️⃣ Insert creator as admin
    const memberSql = `
      INSERT INTO project_members (project_id, user_id, role)
      VALUES (?, ?, 'admin')
    `;

    db.query(memberSql, [projectId, userId], (err) => {
      if (err) {
        console.error("ADD ADMIN ERROR:", err);
        return res
          .status(500)
          .json({ message: "Member attach failed" });
      }

      res.json({
        message: "Project created",
        projectId,
      });
    });
  });
};

/* ===============================
   GET PROJECTS FOR USER
================================ */
exports.getMyProjects = (req, res) => {
  const userId = req.query.userId;

  const sql = `
    SELECT p.*
    FROM projects p
    JOIN project_members pm ON p.id = pm.project_id
    WHERE pm.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("GET PROJECTS ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch projects" });
    }

    res.json(results);
  });
};

/* ===============================
   GET SINGLE PROJECT
================================ */
exports.getProjectById = (req, res) => {
  const projectId = req.params.id;

  const sql = "SELECT * FROM projects WHERE id = ?";

  db.query(sql, [projectId], (err, results) => {
    if (err) {
      console.error("GET PROJECT ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(results[0]);
  });
};

/* ===============================
   ADD MEMBER TO PROJECT
================================ */
exports.addMemberToProject = (req, res) => {
  const { projectId } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // 1️⃣ Find user by email
  const findUserSql = "SELECT id FROM users WHERE email = ?";

  db.query(findUserSql, [email], (err, users) => {
    if (err) {
      console.error("FIND USER ERROR:", err);
      return res.status(500).json({ message: "DB error" });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = users[0].id;

    // 2️⃣ Add user to project_members
    const addMemberSql = `
      INSERT INTO project_members (project_id, user_id, role)
      VALUES (?, ?, 'member')
    `;

    db.query(addMemberSql, [projectId, userId], (err) => {
      if (err) {
        console.error("ADD MEMBER ERROR:", err);
        return res
          .status(400)
          .json({ message: "User already added" });
      }

      res.json({ message: "Member added successfully" });
    });
  });
};

/* ===============================
   GET PROJECT MEMBERS
================================ */
exports.getProjectMembers = (req, res) => {
  const { projectId } = req.params;

  const sql = `
    SELECT u.id AS user_id, u.name, pm.role
    FROM project_members pm
    JOIN users u ON pm.user_id = u.id
    WHERE pm.project_id = ?
  `;

  db.query(sql, [projectId], (err, results) => {
    if (err) {
      console.error("GET MEMBERS ERROR:", err);
      return res
        .status(500)
        .json({ message: "Failed to fetch members" });
    }

    res.json(results);
  });
};
