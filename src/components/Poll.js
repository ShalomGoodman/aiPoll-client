import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getFutureTimeDifference, getPrevTimeDifference } from './GetTimeDiff';
// import './Poll.css'; // Import the CSS file

const Poll = ({ poll }) => {

  const futureTimeDifference = getFutureTimeDifference(poll.deadline);
  const prevTimeDifference = getPrevTimeDifference(poll.created);

  const navigate = useNavigate();

  const handleVoteButton = () => {
    // Navigate to the poll page /polls/:id
    navigate(`/poll/${poll.id}`);
  };

  return (
    <div className="poll-container">
      <p className="poll-creator">@{poll.user}</p>
      <p className="poll-created">{prevTimeDifference}</p>
      <h2 className="poll-title">{poll.title}</h2>
      <div className="poll-choice">{poll.option_a_label}</div>
      <div className="poll-choice">{poll.option_b_label}</div>
      <p className="poll-votes">{poll.total_votes} votes</p>
      <p className="poll-deadline">{futureTimeDifference}</p>
      <button className="poll-button" onClick={handleVoteButton}>Vote</button>
    </div>
  );
};

export default Poll;
