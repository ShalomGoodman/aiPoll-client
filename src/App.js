import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from '../src/pages/Signup/SignupPage';
import PollPage from './pages/Poll/PollPage';
import Modal from './components/modal/CreatePoll';
import { AuthProvider } from './auth/AuthContextComponent';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };



  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {showModal && <Modal />}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<><NavBar onModalToggle={handleModalToggle} /><HomePage /></>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/poll/:id" element={<><NavBar onModalToggle={handleModalToggle} /><PollPage /></>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
