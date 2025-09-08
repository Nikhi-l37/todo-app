import TodoItem from './TodoItem';

// Are the props here spelled EXACTLY right?
function TodoList({ todos, onToggleComplete, onDelete }) {
  console.log("2. Data received in TodoList:", todos); // <-- CRITICAL LOG

  return (
    <ul>
      {/* This safety check is very important */}
      {Array.isArray(todos) && todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo} // Is this spelled 'todo' (singular)?
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;