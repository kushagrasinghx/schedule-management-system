import { useState } from 'react';

function TaskItem({ task, onDelete, onToggleDone }) {
  return (
    <div className={`task-item ${task.done ? 'done' : ''}`}>
      <div className="task-details">
        <span className="task-title">
          {task.title}
        </span>
        <span className="task-meta">
          _{task.date} | {task.startTime} – {task.endTime}
        </span>
      </div>
      <div className="actions">
        <button onClick={() => onToggleDone(task.id)}>
          {task.done ? 'Undo' : 'Mark as Done'}
        </button>
        <button onClick={() => onDelete(task.id)}>🗑️</button>
      </div>
    </div>
  );
}

export default TaskItem;
