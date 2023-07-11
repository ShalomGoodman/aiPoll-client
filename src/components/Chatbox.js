import React, { useState } from 'react';

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle submitting a comment
    // You can store the comment, user handle, profile picture, and timestamp in the comments state
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Chatbox</button>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chatbox</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="chatbox-comments">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="user-profile">
                  <img src={comment.profilePicture} alt="Profile" />
                  <span>{comment.userHandle}</span>
                </div>
                <div className="comment-content">
                  <p>{comment.comment}</p>
                  <span>{comment.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>User Handle:</label>
              <input type="text" required />
            </div>
            <div>
              <label>Profile Picture:</label>
              <input type="file" accept="image/*" required />
            </div>
            <div>
              <label>Comment:</label>
              <textarea required></textarea>
            </div>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbox;

