import React, { useState } from "react";
import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend on component mount
  React.useEffect(() => {
   
  }, []);


  // Add a new task
  const addTask = () => {
    if (newTask) {
      axios
        .post("http://localhost:5000/api/tasks", { task: newTask })
        .then((response) => {
          setTasks([...tasks, response.data]); // Add new task to the list
          setNewTask(""); // Clear the input field
        })
        .catch((error) => {
          console.error("There was an error adding the task:", error);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
