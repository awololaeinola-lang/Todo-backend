
import React, { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

function TodoItem({ todo, deleteTodo, toggleTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(todo.task);

  const saveEdit = () => {
    updateTodo(todo._id, newTask);
    setIsEditing(false);
  };

  return (
    <li style={{
      background: "#3504040e",
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "6px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo._id, !todo.completed)}
        />
        {isEditing ? (
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        ) : (
       
         <span
  style={{
    marginLeft: "10px",
    textDecoration: todo.completed ? "line-through" : "none"
  }}
>
  {todo.task}
</span>
 
        )}
      </div>

      <div>
        {isEditing ? (
          <>
            <button onClick={saveEdit} style={{ marginRight: "5px" }}><FaSave /></button>
            <button onClick={() => setIsEditing(false)}><FaTimes /></button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} style={{ marginRight: "5px" }}><FaEdit /></button>
            <button onClick={() => deleteTodo(todo._id)}><FaTrash color="red" /></button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
