import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Add a task to the database
  const addTask = () => {
    if (newTask) {
      fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      })
        .then((res) => res.json())
        .then(({ tasks }) => setTasks(tasks));
      setNewTask(""); // Clear the input field
    }
  };

  // Delete a task from the database
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ tasks }) => setTasks(tasks));
  };

  return (
    <div>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task}{" "}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
