import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/'

function Comment() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);
gi
  const fetchComments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/comments/');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="comment-container">
      {comments.map((comment) => (
        <p key={comment.id}>{comment.text}</p>
      ))}
    </div>
  );
}

export default Comment;
