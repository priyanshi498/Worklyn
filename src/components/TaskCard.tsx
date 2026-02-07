import { useEffect, useState } from "react";
import { getCommentsByTask, addComment } from "../api/commentApi";

interface Props {
  task: any;
  members: any[];
  onMove: (taskId: number, status: string) => void;
  onAssign: (taskId: number, userId: number | null) => void;
}

/* STATUS BADGE COLORS */
const statusColor = (status: string) => {
  if (status === "todo") return "bg-gray-200 text-gray-700";
  if (status === "in_progress") return "bg-blue-200 text-blue-700";
  if (status === "done") return "bg-green-200 text-green-700";
  return "";
};

export default function TaskCard({
  task,
  members,
  onMove,
  onAssign,
}: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const loadComments = async () => {
    const data = await getCommentsByTask(task.id);
    setComments(data);
  };

  useEffect(() => {
    if (showComments) loadComments();
  }, [showComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    await addComment({
      taskId: task.id,
      userId: user.id,
      message: newComment,
    });

    setNewComment("");
    loadComments();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      {/* TITLE */}
      <h4 className="font-semibold text-gray-900">
        {task.title}
      </h4>

      {/* STATUS BADGE */}
      <span
        className={`inline-block text-xs px-2 py-1 rounded mt-2 ${statusColor(
          task.status
        )}`}
      >
        {task.status.replace("_", " ").toUpperCase()}
      </span>

      {/* DESCRIPTION */}
      {task.description && (
        <p className="text-sm text-gray-600 mt-2">
          {task.description}
        </p>
      )}

      {/* ASSIGNED TO */}
      <p className="text-xs text-gray-500 mt-2">
        Assigned to:{" "}
        <span className="font-medium">
          {task.assigned_name || "Unassigned"}
        </span>
      </p>

      {/* ASSIGN MEMBER */}
      <select
        className="mt-2 w-full border p-1 rounded text-sm"
        value={task.assigned_to || ""}
        onChange={(e) =>
          onAssign(
            task.id,
            e.target.value ? Number(e.target.value) : null
          )
        }
      >
        <option value="">Unassigned</option>
        {members.map((m) => (
          <option key={m.user_id} value={m.user_id}>
            {m.name}
          </option>
        ))}
      </select>

      {/* MOVE TASK */}
      <div className="flex gap-3 mt-3 text-xs">
        {task.status !== "todo" && (
          <button
            className="text-blue-600"
            onClick={() => onMove(task.id, "todo")}
          >
            Todo
          </button>
        )}
        {task.status !== "in_progress" && (
          <button
            className="text-blue-600"
            onClick={() => onMove(task.id, "in_progress")}
          >
            In Progress
          </button>
        )}
        {task.status !== "done" && (
          <button
            className="text-green-600"
            onClick={() => onMove(task.id, "done")}
          >
            Done
          </button>
        )}
      </div>

      {/* COMMENTS TOGGLE */}
      <button
        className="mt-3 text-xs text-purple-600"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? "Hide comments" : "View comments"}
      </button>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="mt-3 border-t pt-3">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {comments.length === 0 && (
              <p className="text-xs text-gray-400 italic">
                No comments yet
              </p>
            )}

            {comments.map((c) => (
              <div key={c.id} className="text-sm">
                <span className="font-semibold">
                  {c.name}:
                </span>{" "}
                {c.message}
              </div>
            ))}
          </div>

          {/* ADD COMMENT */}
          <div className="mt-2 flex gap-2">
            <input
              className="flex-1 border p-1 rounded text-sm"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="bg-purple-600 text-white px-3 rounded text-sm"
              onClick={handleAddComment}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
