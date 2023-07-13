import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';

const Comment = ({comment}) => {
    id: 1,
    creator_name: "user1",
    text: "testing",
    created_at: "2023-07-12T17:51:00.091327Z",
  chatbox: 13
}

function Comment(comments_id) {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    fetchComment();
  }, []);

  const fetchComment = async () => {
    try {
      const response = await axios.get(`https://ai-poll-b30b8a89907a.herokuapp.com/api/comments/${comments_id}/`, {
        headers: {
          Authorization: 'token 0778a77e06eaa48a2be71a412a4c966c1a815000'
        }
      });
      setComment(response.data);
    } catch (error) { console.error(error) }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   d
  };

  return (
    <div className="comment-container">
      {comment.map((comment) => (
        <p key={comment.id}>{comment.text}</p>
    </div>
    ))};
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

export default Comment;
