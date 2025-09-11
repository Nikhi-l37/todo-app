// in src/App.jsx

import { Routes, Route } from 'react-router-dom';

// --- THE MISSING IMPORT IS HERE ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Make sure this line exists
import TodoPage from './pages/TodoPage';
import ProtectedRoute from './components/ProtectedRoute';

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
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;