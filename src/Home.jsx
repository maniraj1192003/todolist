import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import './Home.css';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get('http://localhost:5000/todos')
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)); // update UI
      })
      .catch((err) => {
        console.error("Error deleting todo:", err);
      });
  };

  return (
    <div className="home-container">
      {/* Pass only setTodos */}
      <Create setTodos={setTodos} />

      <div className="todo-list-center">
        {todos.length === 0 ? (
          <p>No record to show</p>
        ) : (
          todos.map((todo) => (
            <div className="todo-item" key={todo._id}>
              <span>{todo.task}</span>
              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
