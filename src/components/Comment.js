import React from 'react';
import './Comment.css'; // Import the CSS file
import { getPrevTimeDifference } from './GetTimeDiff';
import { FaTrash } from 'react-icons/fa';

function Comment({ comment, handleDelete }) {
  const prevTimeDifference = getPrevTimeDifference(comment.created_at);

  return (
    <div className="comment-container">
      <div key={comment.id} className="comment">
        <div className="user-profile">
          <span>@{comment.creator_name}</span>
        </div>
        <div className="comment-content">
          <p>{comment.text}</p>
          <span>{prevTimeDifference}</span>
          {Number(comment.creator) === Number(localStorage.getItem('user_id')) && (
            <button onClick={() => handleDelete(comment.id)} className="delete-btn">
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
