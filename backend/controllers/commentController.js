const db = require("../db");

/* ADD COMMENT */
exports.addComment = (req, res) => {
  const { taskId, userId, message } = req.body;

  if (!taskId || !userId || !message) {
    return res.status(400).json({ message: "Missing data" });
  }

  const sql =
    "INSERT INTO comments (task_id, user_id, message) VALUES (?, ?, ?)";

  db.query(sql, [taskId, userId, message], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to add comment" });
    }

    res.json({ message: "Comment added" });
  });
};

/* GET COMMENTS BY TASK */
exports.getCommentsByTask = (req, res) => {
  const { taskId } = req.params;

  const sql = `
    SELECT c.*, u.name
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.task_id = ?
    ORDER BY c.created_at ASC
  `;

  db.query(sql, [taskId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
