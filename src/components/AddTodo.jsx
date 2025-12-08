
import React, { useState } from "react";

const AddTodo = ({ fetchTodos }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);

    try {
      await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({ task: text }),

      });

      setText(""); // Clear input
      fetchTodos(); // Refresh todo list
    } catch (error) {
      console.error("Add Todo Error:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="task"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          width: "70%",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          border: "none",
          background: "#007bff",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default AddTodo;
