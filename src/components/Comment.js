import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css'; // Import the CSS file

function Comment({comment}) {

  return (
    <div className="comment-container">
              <div key={comment.id} className="comment">
                <div className="user-profile">
                  <span>{comment.creator_name}</span>
                </div>
                <div className="comment-content">
                  <p>{comment.text}</p>
                  <span>{comment.created_at}</span>
                </div>
              </div>
    </div>
  );
}

export default Comment;
