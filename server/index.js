const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Port = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

let todos = []; 

app.post("/tasks", (req, res) => {
  const { tasks } = req.body;
  tasks.forEach(task => todos.push(task));
  console.log(todos);
  res.status(200).json({ message: "Tasks received successfully" });
});

app.put('/tasks/show', (req, res) => {
  const { editTaskID, textEdit } = req.body;
  let taskFound = false;
  
  todos = todos.map((task) => {
    if (task.id === editTaskID) {
      taskFound = true;
      return { ...task, title: textEdit };
    }
    return task;
  });

  if (taskFound) {
    res.status(202).json({ message: "Task updated successfully.", tasks: todos });
  } else {
    res.status(404).json({ message: "Task not found." });
  }
});

app.delete('/tasks/delete', (req, res) => {
  const { delId } = req.body;
  const initialLength = todos.length;
  
  todos = todos.filter((task) => task.id !== delId); 
  
  if (todos.length < initialLength) {
    res.status(200).json({ message: "Task deleted successfully.", tasks: todos });
  } else {
    res.status(404).json({ message: "Task not found." });
  }
});

app.get('/tasks/show', (req, res) => {
  res.status(200).json({ todos });
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});