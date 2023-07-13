import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
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

  useEffect(() => {
    // Fetch poll data from the backend API
    const fetchPollData = async () => {
      try {
        const response = await axios.get(`https://ai-poll-b30b8a89907a.herokuapp.com/api/polls/${poll.id}/`);
        setPollData(response.data);
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };

    fetchPollData();
  }, [poll.id]);

  const handleVote = (option) => {
    axios.post(`https://ai-poll-b30b8a89907a.herokuapp.com/api/polls/${pollData.id}/vote/`, {
      option: option.toLowerCase()
    }, 
    {
      headers: {
        Authorization: `token 1e1ac01a8f065d810ada1286bb47458bf06b354a`
      }
    })
    .then(response => {
      console.log(response.data); // Handle the response as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const pollContainerClass = classnames('poll-container', {
    'poll-closed': pollData.voting_status === 'closed'
  });

  return (
    <div className={pollContainerClass}>
      <h2 className="poll-title">{pollData.title}</h2>
      <p className="poll-category">{pollData.category}</p>
      <p className="poll-deadline">Deadline: {pollData.deadline}</p>

      <div className="poll-form">
        <div className="poll-choice">
          <div
            onClick={() => handleVote('A')}
            className={classnames('poll-option-label', { 'poll-closed': pollData.voting_status === 'closed' })}
          >
            {pollData.option_a_label}
          </div>
          <p className="poll-votes">Votes: {pollData.option_a_votes}</p>
        </div>

        <div className="poll-choice">
          <div
            onClick={() => handleVote('B')}
            className={classnames('poll-option-label', { 'poll-closed': pollData.voting_status === 'closed' })}
          >
            {pollData.option_b_label}
          </div>
          <p className="poll-votes">Votes: {pollData.option_b_votes}</p>
        </div>
      </div>
    </div>
  );
};

export default Poll;
