import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the page they asked for
  return children;
}

export default ProtectedRoute;