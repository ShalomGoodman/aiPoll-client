import React, { useState } from 'react';
import axios from 'axios';

function CreatePoll({ onPollCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = event => {
    event.preventDefault();
    
    axios.post('/api/polls', {
      title,
      option1,
      option2
    })
    .then(response => {
      onPollCreated(response.data);
      setTitle('');
      setOption1('');
      setOption2('');
      handleClose();
    })
    .catch(error => {
      console.error('Error creating poll:', error);
    });
  };

  return (
    <div>
      <button onClick={handleOpen}>
        Create Poll
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleClose}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </label>
              <label>
                Option 1:
                <input type="text" value={option1} onChange={e => setOption1(e.target.value)} required />
              </label>
              <label>
                Option 2:
                <input type="text" value={option2} onChange={e => setOption2(e.target.value)} required />
              </label>
              <button type="submit">Save Poll</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePoll;
