import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePoll from '../../components/modal/CreatePoll';
import Poll from '../../components/Poll';


function HomePage() {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const token = localStorage.getItem("token"); // Fetch the JWT token from local storage
      const response = await axios.get('https://ai-poll-b30b8a89907a.herokuapp.com/api/polls/', {
        headers: {
          Authorization: `token ${token}`, // Set the token as the Authorization header
        },
      });
      setPolls(response.data);
    } catch (error) { console.error(error) }
  };
  
  useEffect(() => {
    // Fetch polls on component mount
    fetchPolls();
  }, []);

  return (
    <div> 
      {polls.map((poll) => (
        <Poll key={poll.id} poll={poll} />
      ))}
    </div>
  );
}

export default HomePage;
