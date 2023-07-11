import React, { useState } from 'react';
import axios from 'axios';

function CreatePoll({ onPollCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [tokenSpending, setTokenSpending] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const pollData = {
      title,
      option1,
      option2,
      time: {
        days,
        hours,
        minutes,
      },
    };

    axios
      .post('/api/polls', pollData)
      .then((response) => {
        onPollCreated(response.data);
        setTitle('');
        setOption1('');
        setOption2('');
        setDays(0);
        setHours(0);
        setMinutes(0);
        setShowConfirmation(true);
      })
      .catch((error) => {
        console.error('Error creating poll:', error);
      });
  };

  const handleConfirmPayment = () => {
    // Perform the payment logic
    // ...

    // Close the confirmation modal
    setShowConfirmation(false);
    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen}>Create Poll</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleClose}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Option 1:
                <input
                  type="text"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                  required
                />
              </label>
              <label>
                Option 2:
                <input
                  type="text"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                  required
                />
              </label>
              <div>
                <label>
                  Time:
                  <select
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i}>
                        {i} days
                      </option>
                    ))}
                  </select>
                  <select
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i} hours
                      </option>
                    ))}
                  </select>
                  <select
                    value={minutes}
                    onChange={(e) => setMinutes(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i}>
                        {i} minutes
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button type="submit">Save Poll</button>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <span className="close-button" onClick={handleClose}>
              &times;
            </span>
            <p>Confirm token spending: {tokenSpending}</p>
            <button onClick={handleConfirmPayment}>Pay Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePoll;
