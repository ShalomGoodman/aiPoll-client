import React, { useEffect, useState } from 'react';
import Comment from '../components/Comment';
import base from '../auth/baseURL';


function Chatbox({ chatbox_id }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(''); // Add this state


  useEffect(() => {
    fetchChatbox();
  }, []);


  const fetchChatbox = async () => {
    try {
      const response = await base.get(`/api/chatboxes/${chatbox_id}/`, {});
      setComments(response.data);
    } catch (error) { console.error(error) }
  };

  function handleCommentTextChange(event) {
    setCommentText(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission
    const comment = base.post(`/api/comments/`, { 
      id: comments.length + 1,
      text: commentText,
      chatbox: chatbox_id,
      creator: Number(localStorage.getItem("user_id")),
    
    });
    setComments(prevState => [...prevState, comment]);
  };

  return (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chatbox</h3>
          </div>
          <div className="chatbox-comments">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}

          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <textarea onChange={handleCommentTextChange} required></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      );
}

export default Chatbox;

