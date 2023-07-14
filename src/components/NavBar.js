import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import CreatePoll from './modal/CreatePoll';
import { ToastContainer, toast } from 'react-toastify';

const NavBar = ({ connectWallet, walletAddress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false); // set isLoggedIn to false
    localStorage.removeItem("token"); // remove the token
    navigate("/login");
    toast.success("Logged out successfully!", { autoClose: 1500 });
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true"; // get isLoggedIn from local storage

  if (isLoginPage) {
    return null; // Don't render the navbar on the login page
  }

  return (
    <nav>
      <ul className="navbar-list">
        {isLoggedIn ? (
          <>
            <CreatePoll />
            <li>
              <Link
                id="walletButton"
                className="connect-wallet-button"
                onClick={connectWallet}
              >
                {walletAddress.length > 0 ? (
                  <>
                    Connected: {walletAddress.substring(0, 6)}...
                    {walletAddress.substring(38)}
                  </>
                ) : (
                  <span>Connect Wallet</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/home" className="home-button" onClick={() => navigate("/login")}>
                Home
              </Link>
            </li>
            <li>
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => navigate("/login")}>
                Login
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/signup")}>
                Signup
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
