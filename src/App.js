import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import PollPage from './pages/Poll/PollPage';
import SignupPage from './pages/Signup/SignupPage';
import NavBar from './components/NavBar';
import Modal from '../src/components/modal/CreatePoll';
import '../src/components/CreatePoll.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <Router>
      <div className="App">
        <NavBar onModalToggle={handleModalToggle} />
        {showModal && <Modal />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/poll/:id" element={<PollPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;