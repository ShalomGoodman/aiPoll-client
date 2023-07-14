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
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!", { autoClose: 1500 });
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";

  if (isLoginPage) {
    return null;
  }

  return (
    <nav>
      <ul className="navbar-list">
        {isLoggedIn ? (
          <>
            <CreatePoll />
            <li>
              <button
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
              </button>
            </li>
            <li>
              <button
                className="home-button"
                onClick={() => navigate("/home")}
              >
                Home
              </button>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
