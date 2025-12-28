import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header/Header';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <ThemeProvider>
      <AuthProvider value={{ currentUser, handleLogin, handleLogout }}>
        <div className="App">
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <main className="main-content">
            {isAuthenticated ? (
              <Dashboard user={currentUser} />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )}
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;