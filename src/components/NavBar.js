import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './navbar.css';
import CreatePoll from './modal/CreatePoll';
import { ToastContainer, toast } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false); // set isLoggedIn to false
    localStorage.removeItem("token"); // remove the token
    navigate("/login");
    toast.success("Logged out successfully!", { autoClose: 1500 });
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true"; // get isLoggedIn from local storage

  return (
    <nav>
         <ul className="navbar-list">
      {isLoggedIn 
      ? <>
        <CreatePoll />
        <Link to="/home" onClick={() => navigate("/login")}>Home</Link>
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
        </>
      : <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </>
      }
    </ul>
    </nav>
  );
};

export default NavBar;
