import React, { useEffect, useState } from 'react';

function Chatbox(chatbox_id) {
  const [comments, setComments] = useState([]);


  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://ai-poll-b30b8a89907a.herokuapp.com/api/chatbox/${chatbox_id}/`, {
        headers: {
          Authorization: 'token 1e1ac01a8f065d810ada1286bb47458bf06b354a'
        }
      });
      setComments(response.data);
    } catch (error) { console.error(error) }
  };



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

