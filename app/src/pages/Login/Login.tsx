// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // now that location & navigate exist:
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Log in to access Private</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
