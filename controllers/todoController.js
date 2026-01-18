const Todo = require("../models/Todo");

// GET all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ order: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE todo
exports.createTodo = async (req, res) => {
  try {
    const { task, priority, dueDate } = req.body;

    const todo = new Todo({
      task,
      priority,
      dueDate,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE completed
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
