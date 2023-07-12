import React, { useState } from 'react';
import styles from './CreatePoll.css'; 

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

    // Add your logic to handle submitting the poll data and show the confirmation modal
  };

  const handleConfirmPayment = () => {
    // Perform the payment logic
    // ...

    // Close the confirmation modal
    setShowConfirmation(false);
    handleClose();
  };

  const renderCreatePollModal = () => {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={handleClose}>
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
              <div className={styles.timeSection}>
                <label>
                  Time:
                  <select
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  >
                    {/* Dropdown options for days */}
                  </select>
                  <select
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                  >
                    {/* Dropdown options for hours */}
                  </select>
                  <select
                    value={minutes}
                    onChange={(e) => setMinutes(parseInt(e.target.value))}
                  >
                    {/* Dropdown options for minutes */}
                  </select>
                </label>
              </div>
              <button type="submit">Save Poll</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmationModal = () => {
    return (
      <div className={styles.confirmationModal}>
        <div className={styles.confirmationContainer}>
          <div className={styles.confirmationContent}>
            <span className={styles.closeButton} onClick={handleClose}>
              &times;
            </span>
            <p>Confirm token spending: {tokenSpending}</p>
            <button onClick={handleConfirmPayment}>Pay Now</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button onClick={handleOpen}>Create Poll</button>

      {isOpen && (
        <>
          {renderCreatePollModal()}
          {showConfirmation && renderConfirmationModal()}
        </>
      )}
    </div>
  );
}

export default CreatePoll;
