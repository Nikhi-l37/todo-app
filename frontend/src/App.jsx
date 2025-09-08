// in src/App.jsx

import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <Routes>
      {/* A Route for the main page, which is our Todo list */}
      <Route path="/" element={<TodoPage />} />
      
      {/* A Route for the login page */}
      <Route path="/login" element={<LoginPage />} />

      {/* A Route for the register page */}
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;