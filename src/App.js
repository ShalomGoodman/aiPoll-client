// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import PollPage from './pages/Poll/PollPage';
import SignupPage from './pages/Signup/SignupPage';
import NavBar from './components/NavBar';
import CreatePoll from './components/CreatePoll'; // <-- import your CreatePoll component

function App() {
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);

  return (
    <Router>
      <div>
        <NavBar onOpenCreatePoll={() => setIsCreatePollOpen(true)} />
        <CreatePoll isOpen={isCreatePollOpen} onClose={() => setIsCreatePollOpen(false)} />
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
