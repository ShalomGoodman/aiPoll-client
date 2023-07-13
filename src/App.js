import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import PollPage from './pages/Poll/PollPage';
import Modal from './components/modal/CreatePoll';
import { AuthProvider } from './auth/AuthContextComponent';
import { ConnectWallet, getCurrentWalletConnected } from './util/walletConnection';

function App() {
  const [walletAddress, setWallet] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [walletStatus, setWalletStatus] = useState("");

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const connectWallet = async () => {
    const walletResponse = await ConnectWallet();
    setWalletStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  useEffect(() => {
    const checkConnectedWallet = async () => {
      const walletResponse = await getCurrentWalletConnected();
      setWalletStatus(walletResponse.status);
      setWallet(walletResponse.address);
    };
    checkConnectedWallet();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {showModal && <Modal />}
          <div id="container">
            <button id="walletButton" onClick={connectWallet}>
              {walletAddress.length > 0 ? (
                <>
                  Connected: {walletAddress.substring(0, 6)}...
                  {walletAddress.substring(38)}
                </>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
          </div>
          <Routes>
            <Route path="/home" element={<><NavBar onModalToggle={handleModalToggle} /><HomePage /></>} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/poll/:id" element={<><NavBar onModalToggle={handleModalToggle} /><PollPage /></>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
