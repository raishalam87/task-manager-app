import React from 'react';

function TaskItem({ task, toggleCompletion, deleteTask }) {
  const handleComplete = () => {
    toggleCompletion(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <div>
        <button onClick={handleComplete}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
