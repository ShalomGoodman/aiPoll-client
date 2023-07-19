import React, { useState, useEffect } from "react";
import "./pollpage.css";
import { useParams } from "react-router-dom";
import base from "../../auth/baseURL";
import {
  getFutureTimeDifference,
  getPrevTimeDifference,
} from "../../util/GetTimeDiff";
import Chatbox from "../../components/Chatbox";
import { ToastContainer, toast } from "react-toastify";

const PollPage = () => {
  const { id } = useParams();
  const [pollData, setPollData] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [highestVote, setHighestVote] = useState("");

  useEffect(() => {
    console.log(pollData);
  }, [pollData]);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await base.get(`/api/polls/${id}/`);
        setPollData(response.data);
      } catch (error) {
        console.error("Error fetching poll data:", error);
      }
    };

    const votedPolls = JSON.parse(localStorage.getItem("polls_voted")) || [];
    setUserVoted(votedPolls.includes(id));

    fetchPollData();
  }, [id, userVoted]);

  useEffect(() => {
    if (pollData) {
      const maxPercentage = Math.max(...pollData.percentages);
      const highestVoteIndex = pollData.percentages.indexOf(maxPercentage);

      if (highestVoteIndex === 0) {
        setHighestVote("a");
      } else if (highestVoteIndex === 1) {
        setHighestVote("b");
      }
    }
  }, [pollData]);

  const futureTimeDifference = pollData
    ? getFutureTimeDifference(pollData.deadline)
    : null;
  const prevTimeDifference = pollData
    ? getPrevTimeDifference(pollData.created)
    : null;

  const handleVote = async (option) => {
    if (userVoted) return;
    try {
      await base.post(`/api/polls/${id}/vote/`, { option: option });
      setUserVoted(true);
      const votedPolls = JSON.parse(localStorage.getItem("polls_voted")) || [];
      votedPolls.push(id);
      localStorage.setItem("polls_voted", JSON.stringify(votedPolls));
      toast.success(`Vote counted for option ${option.toUpperCase()}!`);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Even though its your right, your vote still wasnt counted :("
      );
    }
  };

  return (
    <div className="poll-page">
      <div className="vote-container">
        {pollData && (
          <>
            <p className="poll-creator">
              @{pollData.user} • {prevTimeDifference}
            </p>
            <h2 className="poll-title">{pollData.title}</h2>
            {userVoted || pollData.voting_status === "closed" ? (
              <div className="poll-results">
                <div className="poll-result">
                  <div
                    className={`poll-result-label-a ${
                      highestVote === "a" ? "highest-vote" : ""
                    }`}
                    style={{ width: `${pollData.percentages[0]}%` }}
                  >
                    {pollData.option_a_label} ∙ {pollData.percentages[0]}%
                  </div>
                </div>
                <div className="poll-result">
                  <div
                    className={`poll-result-label-b ${
                      highestVote === "b" ? "highest-vote" : ""
                    }`}
                    style={{ width: `${pollData.percentages[1]}%` }}
                  >
                    {pollData.option_b_label} ∙ {pollData.percentages[1]}%
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="poll-form">
                  <div className="poll-choice">
                    <div onClick={() => handleVote("a")}>
                      {pollData.option_a_label}
                    </div>
                  </div>
                  <div className="poll-choice">
                    <div onClick={() => handleVote("b")}>
                      {pollData.option_b_label}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <p className="poll-deadline">
              {pollData.total_votes} votes • {futureTimeDifference}
            </p>
            <Chatbox chatbox_id={pollData.chatbox} />
          </>
        )}
      </div>
    </div>
  );
};

export default PollPage;
