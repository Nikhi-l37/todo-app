import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
          headers: { 'x-auth-token': token },
        });

        if (!response.ok) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    // Only fetch if a token exists. This check is an extra safety layer.
    if (localStorage.getItem('token')) {
      fetchTodos();
    }
  }, [navigate]);

  const handleAddTodo = async (title) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ title: title }),
      });
      const newlyCreatedTodo = await response.json();
      setTodos([...todos, newlyCreatedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token },
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (id, currentCompletedStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ completed: !currentCompletedStatus }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <h1>My To-Do App</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default TodoPage;