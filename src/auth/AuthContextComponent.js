import React, { createContext, useState } from 'react';
import { signin, logout } from '../auth/validToken'; // Import the required functions

export const AuthContext = createContext(null); // Export AuthContext as a named export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const data = await signin(username, password);
    setUser({
      id: data.user_id,
      email: data.email,
      token: data.token,
    }); // Store the user's data in the state
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.href = '/login'; // Redirect to the login page
  };

  const contextValue = {
    user,
    login,
    logout: handleLogout, // Use the handleLogout function
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
