import React, { useEffect, useState } from 'react';
import base from '../auth/baseURL';

function Chatbox({ chatbox_id }) {
  const [comments, setComments] = useState([]);
  console.log(chatbox_id)


  const fetchComments = async () => {
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
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="user-profile">
                  <span>{comment.creator_name}</span>
                </div>
                <div className="comment-content">
                  <p>{comment.text}</p>
                  <span>{comment.created_at}</span>
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

