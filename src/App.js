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
import { ToastContainer, toast } from "react-toastify";
import '../node_modules/react-toastify/dist/ReactToastify.css'

function App() {
  const [walletAddress, setWallet] = useState("");
  const [walletStatus, setWalletStatus] = useState("");
  const isLoggedIn = localStorage.getItem('isLoggedIn')

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
          <ToastContainer />
          {isLoggedIn ? (
            <NavBar connectWallet={connectWallet} walletAddress={walletAddress} />
          ) : null}

          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/poll/:id" element={<PollPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
