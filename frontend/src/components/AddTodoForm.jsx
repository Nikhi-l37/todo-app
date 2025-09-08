// in src/components/AddTodoForm.jsx

import { useState } from 'react';

// This component receives one "prop": onAddTodo
// onAddTodo is the function from the parent (TodoPage) that adds a new todo
function AddTodoForm({ onAddTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return; // Don't add empty todos

    // Call the function passed down from the parent
    onAddTodo(newTodoTitle);

    // Clear the input field after submission
    setNewTodoTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new to-do"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;