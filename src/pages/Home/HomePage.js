import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePoll from '../../components/modal/CreatePoll';


function HomePage() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch polls on component mount
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const token = localStorage.getItem("token"); // Fetch the JWT token from local storage
      const response = await axios.get('https://ai-poll-b30b8a89907a.herokuapp.com/api/polls/', {
        headers: {
          Authorization: `token ${token}`, // Set the token as the Authorization header
        },
      });
      setPolls(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePollCreated = (newPoll) => {
    // Update the list of polls with the newly created poll
    setPolls((prevPolls) => [...prevPolls, newPoll]);
  };

  return (
    <div>
      
      {/* <CreatePoll onPollCreated={handlePollCreated} /> */}

      {/* Render the polls */}
      {polls.map((poll) => (
        <div key={poll.id}>
          <h2>{poll.title}</h2>
          {/* Render other poll details */}
        </div>
      ))}
    </div>
  );
}

export default HomePage;