import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

function Create({ setTodos }) {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleClick = () => {
    if (!task.trim()) return; // prevent empty task

    axios
      .post('http://localhost:5000/add', { task })
      .then((result) => {
        console.log("✅ Task added:", result.data);

        // ✅ Update state immediately
        setTodos((prev) => [...prev, result.data]);

        // Clear input
        setTask('');
      })
      .catch((error) => {
        console.error('❌ There was an error adding the todo!', error);
      });
  };

  return (
    <div className="home-container">
      <h2 style={{ color: '#ff6b35', textShadow: '1px 1px #000' }}>
        Create Todo
      </h2>
      <div className="uiverse-pixel-input-wrapper">
        <input
          id="todo-input"
          className="uiverse-pixel-input"
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter todo..."
        />
        <button className="uiverse-pixel-btn" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
