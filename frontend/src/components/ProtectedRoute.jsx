// in src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';

// This component acts as a "gatekeeper"
function ProtectedRoute({ children }) {
  // 1. Check if the user has a token in their local storage
  const token = localStorage.getItem('token');

  // 2. If there is NO token...
  if (!token) {
    // ...redirect them to the login page.
    // The 'replace' prop is a good practice to prevent the user from
    // clicking the "back" button and getting stuck in a loop.
    return <Navigate to="/login" replace />;
  }

  // 3. If there IS a token, render the children components.
  // (In our case, this will be the <TodoPage />)
  return children;
}

export default ProtectedRoute;