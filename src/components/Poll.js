import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Poll.css'; // Import the CSS file

const Poll = ({ poll }) => {
  const [pollData, setPollData] = useState({
    id: 1,
    user: '',
    title: '',
    option_a_label: '',
    option_a_votes: 0,
    option_b_label: '',
    option_b_votes: 0,
    created: '2023-07-11T19:28:25.362479Z',
    winner: null,
    voting_status: 'open',
    duration_minutes: 0,
    creator: 1,
    chatbox: 1
  });
  const [selectedChoice, setSelectedChoice] = useState('');

  useEffect(() => {
    // Fetch poll data from the backend API
    const fetchPollData = async () => {
      try {
        const response = await axios.get(`/api/polls/${poll.id}/`);
        setPollData(response.data);
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };

    fetchPollData();
  }, [poll.id]);

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const handleVote = () => {
    console.log(selectedChoice);
    // Add your logic here to submit the vote to the backend
  };

  const handleOptionAClick = () => {
    setSelectedChoice('A');
    handleVote();
  };

  const handleOptionBClick = () => {
    setSelectedChoice('B');
    handleVote();
  };

  return (
    <div className="poll-container">
      <h2 className="poll-title">{pollData.title}</h2>
      <p className="poll-category">{pollData.category}</p>
      <p className="poll-deadline">Deadline: {pollData.deadline}</p>

      <div className="poll-form">
        <div className="poll-choice">
          <label>
            <input
              type="radio"
              value="A"
              checked={selectedChoice === 'A'}
              onChange={handleChoiceChange}
            />
            <span onClick={handleOptionAClick} className="poll-option-label">
              {pollData.option_a_label}
            </span>
          </label>
          <p className="poll-votes">Votes: {pollData.option_a_votes}</p>
        </div>

        <div className="poll-choice">
          <label>
            <input
              type="radio"
              value="B"
              checked={selectedChoice === 'B'}
              onChange={handleChoiceChange}
            />
            <span onClick={handleOptionBClick} className="poll-option-label">
              {pollData.option_b_label}
            </span>
          </label>
          <p className="poll-votes">Votes: {pollData.option_b_votes}</p>
        </div>
      </div>
    </div>
  );
};

export default Poll;
