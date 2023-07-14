import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './navbar.css';
const NavBar = ({ onModalToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false); // set isLoggedIn to false
    localStorage.removeItem("token"); // remove the token
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true"; // get isLoggedIn from local storage

  return (
    <nav>
         <ul className="navbar-list"></ul>
      {isLoggedIn 
      ? <>
        <Link to="/home"  onClick={() => navigate("/login")}>Home
            </Link>
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
          <button 
            style={{ 
              padding: '10px', 
              borderRadius: '10px', 
              backgroundColor: 'white', 
              color: 'black' 
            }} 
            onClick={onModalToggle}
          >
            Create Poll
          </button>
        </>
      : <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </>
      }
    </nav>
  );
};

export default NavBar;
