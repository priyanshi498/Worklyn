const db = require("../db");

/* ===============================
   CREATE TASK
================================ */
exports.createTask = (req, res) => {
  const { title, description, projectId, assignedTo, createdBy } = req.body;

  if (!title || !projectId || !createdBy) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO tasks 
    (title, description, project_id, assigned_to, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description || null, projectId, assignedTo || null, createdBy],
    (err, result) => {
      if (err) {
        console.error("CREATE TASK ERROR:", err);
        return res.status(500).json({ message: "Failed to create task" });
      }

      res.json({
        message: "Task created",
        taskId: result.insertId,
      });
    }
  );
};

/* ===============================
   GET TASKS BY PROJECT
================================ */
exports.getTasksByProject = (req, res) => {
  const { projectId } = req.params;

  const sql = `
    SELECT 
      t.*,
      u.name AS assigned_name
    FROM tasks t
    LEFT JOIN users u ON t.assigned_to = u.id
    WHERE t.project_id = ?
    ORDER BY t.created_at DESC
  `;

  db.query(sql, [projectId], (err, results) => {
    if (err) {
      console.error("FETCH TASKS ERROR:", err);
      return res.status(500).json({ message: "Failed to fetch tasks" });
    }

    res.json(results);
  });
};

/* ===============================
   UPDATE TASK STATUS
================================ */
exports.updateTaskStatus = (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const allowedStatus = ["todo", "in_progress", "done"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = `
    UPDATE tasks
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, taskId], (err) => {
    if (err) {
      console.error("UPDATE TASK ERROR:", err);
      return res.status(500).json({ message: "Failed to update task" });
    }

    res.json({ message: "Task status updated" });
  });
};

/* ===============================
   PHASE 4 — ASSIGN TASK TO MEMBER
================================ */
exports.assignTask = (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  const sql = `
    UPDATE tasks
    SET assigned_to = ?
    WHERE id = ?
  `;

  db.query(sql, [userId, taskId], (err) => {
    if (err) {
      console.error("ASSIGN TASK ERROR:", err);
      return res.status(500).json({ message: "Failed to assign task" });
    }

    res.json({ message: "Task assigned successfully" });
  });
};
