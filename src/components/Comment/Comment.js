import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css'; // Import the CSS file
import { getPrevTimeDifference } from './GetTimeDiff';

function Comment({comment}) {

  const prevTimeDifference = getPrevTimeDifference(comment.created_at);

 return (
    <div className="comment-container">
              <div key={comment.id} className="comment">
                <div className="user-profile">
                  <span>{comment.creator_name}</span>
                </div>
                <div className="comment-content">
                  <p>{comment.text}</p>
                  <span>{prevTimeDifference}</span>
                </div>
              </div>
    </div>
  );
}

export default Comment;
