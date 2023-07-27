import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFutureTimeDifference, getPrevTimeDifference } from '../util/GetTimeDiff';

const Poll = ({ poll }) => {
  const futureTimeDifference = getFutureTimeDifference(poll.deadline);
  const prevTimeDifference = getPrevTimeDifference(poll.created);

  const navigate = useNavigate();
  const handleVoteButton = () => { navigate(`/poll/${poll.id}`) };

  return (
    <div>
      <p className="poll-creator">@{poll.user} • {prevTimeDifference}</p>
      <h2 className="poll-title">{poll.title}</h2>
      <div className="poll-choice">{poll.option_a_label}</div>
      <div className="poll-choice">{poll.option_b_label}</div>
      <p className="poll-votes">{poll.total_votes} votes • {futureTimeDifference}</p>
      { poll.voting_status === 'open' ? <button className="poll-button" onClick={handleVoteButton}>Vote</button>  :  <button className="poll-button" onClick={handleVoteButton}>View</button>
      }
    </div>
  );
};

export default Poll;
