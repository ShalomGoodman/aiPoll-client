import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import PollPage from './pages/Poll/PollPage';
import SignupPage from './pages/Signup/SignupPage';
import NavBar from './components/NavBar';
import CreatePoll from './components/CreatePoll';

function App() {
  const [isCreatePollOpen, setIsCreatePollOpen] = useState(false);

  const handleCreatePollOpen = () => {
    setIsCreatePollOpen(true);
  };

  const handlePollCreated = (pollData) => {
    console.log('Poll created:', pollData);
    setIsCreatePollOpen(false);
  };

  return (
    <Router>
      <div>
        <NavBar onCreatePoll={handleCreatePollOpen} />
        {isCreatePollOpen && <CreatePoll onPollCreated={handlePollCreated} />}
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
