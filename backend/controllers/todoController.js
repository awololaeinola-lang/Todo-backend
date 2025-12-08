
const Todo = require("../models/todoModels");

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Create new todo
exports.createTodo = async (req, res) => {
  try {
   const todo = await Todo.create({
  task: req.body.task,
  completed: false
});

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

// Toggle complete
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};
