import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './pollpage.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import base from '../../auth/baseURL';
import { getFutureTimeDifference, getPrevTimeDifference } from '../../components/GetTimeDiff';
import Chatbox from '../../components/Chatbox';

const PollPage = () => {
  const { id } = useParams();

  const [pollData, setPollData] = useState(null);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await base.get(`/api/polls/${id}/`);
        setPollData(response.data);
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };

    fetchPollData();
  }, [id]);

  const futureTimeDifference = pollData ? getFutureTimeDifference(pollData.deadline) : null;
  const prevTimeDifference = pollData ? getPrevTimeDifference(pollData.deadline) : null;

  const handleVote = async (option) => {
    try {
      await base.post(`/api/polls/${id}/vote/`, { option: option.toLowerCase() });
      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pollContainerClass = classnames('poll-container', {
    'poll-closed': pollData && pollData.voting_status === 'closed'
  });

  return (
    <div className={pollContainerClass}>
      {pollData && (
        <>
          <p className="poll-creator">@{pollData.user}</p>
          <p className="poll-created">{prevTimeDifference}</p>
          <h2 className="poll-title">{pollData.title}</h2>
          <p className="poll-category">{pollData.category}</p>
          <p className="poll-deadline">{futureTimeDifference}</p>

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

          {pollData.chatbox && <Chatbox chatbox_id={pollData.chatbox} />}
        </>
      )}
    </div>
  );
};

export default PollPage;
