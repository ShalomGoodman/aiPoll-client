import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Poll from '../../components/Poll';
import '../Home/homepage.css';
import { ToastContainer, toast } from "react-toastify";

function HomePage() {
  const [polls, setPolls] = useState([]);
  const [pollCreated, setPollCreated] = useState(false); // Add this state

  const fetchPolls = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch the JWT token from local storage
      const response = await axios.get(
        'https://ai-poll-b30b8a89907a.herokuapp.com/api/polls/',
        {
          headers: {
            Authorization: `token ${token}`, // Set the token as the Authorization header
          },
        }
      );
      setPolls(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Make sure to fetch new polls whenever a poll is created
  useEffect(() => {
    fetchPolls();
  }, [pollCreated]);

  // Call this function whenever a poll is created
  const handlePollCreated = () => {
    setPollCreated(prevState => !prevState);
  };

  return (
    <div className="home-page">
      <h1>Home</h1>
      <div className="polls-container">
        {polls.map(poll => (
          <div key={poll.id} className="poll-container">
            <Poll poll={poll} />
          </div>
          
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default HomePage;
