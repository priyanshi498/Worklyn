const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

/* ---------------- TASK CRUD ---------------- */

/* Create new task */
router.post("/", taskController.createTask);

/* Get all tasks for a project */
router.get("/project/:projectId", taskController.getTasksByProject);

/* Update task status (todo → progress → done) */
router.put("/:taskId/status", taskController.updateTaskStatus);

/* ---------------- PHASE 4 — ASSIGN TASK ---------------- */

/* Assign task to a project member */
router.put("/:taskId/assign", taskController.assignTask);

module.exports = router;
