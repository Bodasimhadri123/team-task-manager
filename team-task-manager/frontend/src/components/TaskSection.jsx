import { useState } from "react";

export default function TaskSection({ projectId }) {
  const [task, setTask] = useState("");

  return (
    <div>
      <input
        placeholder="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button>Add Task</button>
    </div>
  );
}