import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../auth/AuthContextComponent'; // check if this path is correct

const NavBar = ({ onModalToggle }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      {/* You can add more navigation links as needed */}
      <button 
        style={{ 
          padding: '10px', 
          borderRadius: '10px', 
          backgroundColor: 'white', 
          color: 'black' 
        }} 
        onClick={handleLogout}
      >
        Log out
      </button>
    </nav>
  );
};

export default NavBar;
