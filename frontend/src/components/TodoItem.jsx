// Are the props here spelled EXACTLY right?
function TodoItem({ todo, onToggleComplete, onDelete }) {
  // If the list is empty, this component won't even render, so no log is needed here for now.
  
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo._id, todo.completed)}
      />
      {/* Is this using 'todo.title'? */}
      <span>{todo.title}</span> 
      <button onClick={() => onDelete(todo._id)} className="delete-btn">
        &times;
      </button>
    </li>
  );
}

export default TodoItem;