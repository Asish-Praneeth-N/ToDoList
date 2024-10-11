import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [task, setTask] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://todolist-1-9z8t.onrender.com/', {
        email,
        task,
        dateTime,
      });
      setMessage(response.data.message);
      setEmail('');
      setTask('');
      setDateTime('');
    } catch (error) {
      console.error(error);
      setMessage('Error scheduling the task.');
    }
  };

  return (
    <div className="App">
      <h1>To-Do List Task Scheduler</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="email-input"
          />
        </div>
        <div className="form-group">
          <label>Task</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            placeholder="Enter your task"
            className="task-input"
          />
        </div>
        <div className="form-group">
          <label>Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
            className="date-input"
          />
        </div>
        <button type="submit" className="submit-btn">Schedule Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
