import React, { useState, useEffect } from 'react';
import './pollpage.css'; // Import the CSS file
import { useParams } from 'react-router-dom';
import base from '../../auth/baseURL';
import { getFutureTimeDifference, getPrevTimeDifference } from '../../components/GetTimeDiff';
import Chatbox from '../../components/Chatbox';

const PollPage = () => {
  const { id } = useParams();
  const [pollData, setPollData] = useState(null);
  const [userVoted, setUserVoted] = useState(false);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await base.get(`/api/polls/${id}/`);
        setPollData(response.data);
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };

    const votedPolls = JSON.parse(localStorage.getItem('polls_voted')) || [];
    setUserVoted(votedPolls.includes(id));

    fetchPollData();
  }, [id]);

  const futureTimeDifference = pollData ? getFutureTimeDifference(pollData.deadline) : null;
  const prevTimeDifference = pollData ? getPrevTimeDifference(pollData.created) : null;

  const handleVote = async (option) => {
    if (userVoted) return;
    try {
      await base.post(`/api/polls/${id}/vote/`, { option: option });
      setUserVoted(true);
      const votedPolls = JSON.parse(localStorage.getItem('polls_voted')) || [];
      votedPolls.push(id);
      localStorage.setItem('polls_voted', JSON.stringify(votedPolls));
      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {pollData && (
        <>
          <p className="poll-creator">@{pollData.user} - {prevTimeDifference}</p>
          <h2 className="poll-title">{pollData.title}</h2>
          { userVoted || pollData.voting_status == 'closed' ? (
            <div className="poll-results">
              <div className="poll-result">
                <div className="poll-result-label">{pollData.option_a_label}</div>
                <div className="poll-result-bar" style={{ width: `${pollData.option_a_percentage}%` }}></div>
                <div className="poll-result-percentage">{pollData.percentages[0]}%</div>
              </div>
              <div className="poll-result">
                <div className="poll-result-label">{pollData.option_b_label}</div>
                <div className="poll-result-bar" style={{ width: `${pollData.option_b_percentage}%` }}></div>
                <div className="poll-result-percentage">{pollData.percentages[1]}%</div>
              </div>
            </div>
          ) : <div>
                <div className="poll-form">
                  <div className="poll-choice">
                    <div onClick={() => handleVote("a")} >{pollData.option_a_label}</div>
                  </div>
                  <div className="poll-choice">
                    <div onClick={() => handleVote("b")} >{pollData.option_b_label}</div>
                  </div>
                </div> 
              </div>
          }
          <p className="poll-deadline">{pollData.total_votes} votes - {futureTimeDifference}</p>
          <Chatbox chatbox_id={pollData.chatbox} />
        </>
      )}
    </div>
  );
};

export default PollPage;
