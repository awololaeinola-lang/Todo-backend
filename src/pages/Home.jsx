



import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import "../styles/main.css";

function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setTask("");
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === id ? updated : t)));
  };

  const updateTodo = async (id, task) => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === id ? updated : t)));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Filtered & searched todos
  const filteredTodos = todos
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) =>
  (t?.task || "").toLowerCase().includes((search || "").toLowerCase())
);

  return (
    <div className="app-container">
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* Input */}
      <div className="input-group">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Search */}
      <div className="input-group" style={{ marginBottom: "15px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />
      </div>

      {/* Filters */}
      <div className="filter-buttons" style={{ marginBottom: "15px" }}>
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Todo List */}
      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default Home;
