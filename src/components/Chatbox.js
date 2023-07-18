import React, { useEffect, useState } from 'react';
import Comment from '../components/Comment';
import base from '../auth/baseURL';
import { FaPaperPlane,  FaSync } from 'react-icons/fa';

function Chatbox({ chatbox_id }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchChatbox();
  }, []);

  const handleDelete = (id) => {
    base.delete(`/api/comments/${id}`)
    .then(response => {
      console.log(response);
      // Update comments state to remove deleted comment
      setComments(prevComments => prevComments.filter(c => c.id !== id));
    })
    .catch(error => {
      console.log(error);
    });
  }

  const fetchChatbox = async () => {
    try {
      const response = await base.get(`/api/chatboxes/${chatbox_id}/`, {});
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleCommentTextChange(event) {
    setCommentText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await base.post(`/api/comments/`, {
        text: commentText,
        chatbox: chatbox_id,
        creator: Number(localStorage.getItem('user_id')),
      });
      setComments((prevState) => [...prevState, response.data]);
      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <button className="refresh-button" 
        onClick={fetchChatbox}>
          <FaSync/>
          </button>
        <h3>Chatbox</h3>
        <div className='submit-cotainer'>
          </div>
      </div>
      <div className="chatbox-comments">
      {comments.map((comment) => (
         <Comment key={comment.id} comment={comment} handleDelete={handleDelete} />
      ))}
      </div>
      <form onSubmit={handleSubmit}>
  <div>
    <div className='submit-cotainer'>
    <textarea
    className="textarea" 
      placeholder="Type here"
      value={commentText}
      onChange={handleCommentTextChange}
      required
    ></textarea>
    <button className="submit-button">
      <FaPaperPlane/>
    </button>
    </div>
    </div>
</form>
</div>
  );
}

export default Chatbox;
