import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import { toast } from 'react-toastify';
import logo from '../assets/logo_aipoll.png';

const NavBar = ({ connectWallet, walletAddress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully!', { autoClose: 1500 });
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoginPage) {
    return null;
  }

  return (
    <nav className="navbar">
        <img src={logo} alt="ailogo" className="ai-logo" />
      <div className="navbar-buttons">
        {isLoggedIn && (
          <>
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
            <div className="right-side-buttons">
            <button className="home-button" onClick={() => navigate('/home')}>
              Home
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
