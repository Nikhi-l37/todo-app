// in src/App.jsx

import { Routes, Route } from 'react-router-dom';

// --- THIS SECTION IS THE MOST LIKELY SOURCE OF THE ERROR ---
// Are all three of these lines present and spelled correctly?
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // <-- This is the one the error is about
import TodoPage from './pages/TodoPage';
import ProtectedRoute from './components/AddTodoForm';

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        } 
      />
      
      {/* If the import is missing, this line will cause the "not defined" error */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;