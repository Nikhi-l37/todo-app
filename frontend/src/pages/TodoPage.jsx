// in src/pages/TodoPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTodoForm from '../components/AddTodoForm'; // <-- 1. Import the new component
import TodoList from '../components/TodoList'; // <-- 1. Import the new TodoList component
import TodoItem from '../components/TodoItem'; // <-- 1. Import the new TodoList component





function TodoPage() {
  const [todos, setTodos] = useState([]);
  //const [newTodoTitle, setNewTodoTitle] = useState('');
  const navigate = useNavigate();

  // This useEffect now handles authentication
  useEffect(() => {

    const fetchTodos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login'); // If no token, redirect to login
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/api/todos', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          // If token is invalid (e.g., expired), clear it and redirect to login
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();
                console.log("1. Data fetched in TodoPage:", data); // <-- ADD THIS LOG

        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [navigate]); // Dependency array ensures this runs when navigate function is available

  // --- All handler functions below are now updated ---
// in TodoPage.jsx
const handleAddTodo = async (title) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5001/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ title: title }),
      });
      const newlyCreatedTodo = await response.json();

      // --- THIS IS THE CRITICAL LINE ---
      setTodos([...todos, newlyCreatedTodo]); 
      // This line tells React to re-render the list with the new item included.

    } catch (error) {
      console.error("Error adding todo:", error);
    }
};

  const handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token, // Add token to header
        },
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (id, currentCompletedStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Add token to header
        },
        body: JSON.stringify({ completed: !currentCompletedStatus }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (error)
      {
      console.error("Error updating todo:", error);
    }
  };
  
  // A function for logging out
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="app-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <h1>My To-Do App</h1>
      
      <AddTodoForm onAddTodo={handleAddTodo} />

      {/* --- CRITICAL SECTION --- */}
      {/* Are the props here spelled EXACTLY right? */}
      <TodoList 
        todos={todos} 
        onToggleComplete={handleToggleComplete} 
        onDelete={handleDeleteTodo} 
      />
    </div>

  );
}

export default TodoPage;