import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './pollpage.css';

function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    fetchPoll();
  }, []);

  const fetchPoll = async () => {
    try {
      // Make the API request to our Django Web3 API endpoint
      const response = await axios.get(`/api/polls/${id}`);
      setPoll(response.data);
    } catch (error) {
      console.error('Error fetching poll:', error);
    }
  };

  if (!poll) {
    return <div>Blah blahhh...</div>;
  }

  return (
    <div className="pollpage-container">
      <h2>Poll Page</h2>
      <h3 className="poll-title">{poll.title}</h3>
      <p className="poll-option">Option 1: {poll.option1}</p>
      <p className="poll-option">Option 2: {poll.option2}</p>
      <p className="poll-time">
        Time: {poll.time.days} days, {poll.time.hours} hours, {poll.time.minutes} minutes
      </p>
      <div className="poll-details">
        {/* ??? ANY */}
      </div>
    </div>
  );
  
}

export default PollPage;
