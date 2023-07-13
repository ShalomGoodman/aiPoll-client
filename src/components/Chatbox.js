import React, { useEffect, useState } from 'react';
import Comment from '../components/Comment';
import base from '../auth/baseURL';

function Chatbox(chatbox_id) {
  const [chatbox, setChatbox] = useState([]);

  useEffect(() => {
    fetchChatbox();
  }, []);


  const fetchChatbox = async () => {
    try {
      const response = await base.get(`/api/chatboxes/${chatbox_id}/`, {});
      setComments(response.data);
    } catch (error) { console.error(error) }
  };

  useEffect(() => {
    // Fetch polls on component mount
    fetchComments();
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle submitting a comment
    // You can store the comment, user handle, profile picture, and timestamp in the comments state
  };

  return (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chatbox</h3>
          </div>
          <div className="chatbox-comments">
          {chatbox.map((chatbox) => (
  <div key={chatbox.id} className="comment">
    <div className="user-profile">
      <span>{chatbox.creator_name}</span>
    </div>
    <div className="chatbox-content">
      <p>{chatbox.text}</p>
      <span>{chatbox.created_at}</span>
    </div>
  </div>
))}

          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <textarea required></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      );
}

export default Chatbox;

