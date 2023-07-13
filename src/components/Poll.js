import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Poll.css'; // Import the CSS file

const Poll = ( { poll } ) => {
  function getTimeDifference(timestamp) {
    // Convert both dates to milliseconds
    const timestampMs = new Date(timestamp).getTime();
    const nowMs = Date.now();
    
    // Calculate the difference in milliseconds
    let diffMs = nowMs - timestampMs;

    // Return "0 minutes" if the timestamp is in the past
    if (diffMs > 0) {
      return "Final";
    }

    // Convert time difference from milliseconds to minutes, hours and days
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Create time difference string
    let diffString = '';
    if (days > 0) diffString += `${days} day${days !== 1 ? 's' : ''} `;
    if (hours > 0) diffString += `${hours} hour${hours !== 1 ? 's' : ''} `;
    if (minutes > 0) diffString += `${minutes} min${minutes !== 1 ? 's' : ''} left`;
    
    // Remove any extra space at the end
    diffString = diffString.trim();
    
    return diffString;
}
let timeDifference = getTimeDifference(poll.deadline);


  return (
    <div className="poll-container">
      <p className="poll-creator">@{poll.user}</p>
      <p className="poll-created">{poll.created}</p>
      <h2 className="poll-title">{poll.title}</h2>
        <div className="poll-choice" >{poll.option_a_label}</div>
        <div className="poll-choice" >{poll.option_b_label}</div>
      <p className="poll-votes">{poll.total_votes} votes</p>
      <p className="poll-deadline">{timeDifference}</p>
      <button className="poll-button">Vote</button>
      
    </div>
  );
};

export default Poll;
