import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function CreatePoll() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [choiceA, setChoiceA] = useState('');
  const [choiceB, setChoiceB] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleChoiceAChange = (e) => {
    setChoiceA(e.target.value);
  };

  const handleChoiceBChange = (e) => {
    setChoiceB(e.target.value);
  };

  const handleDaysChange = (e) => {
    setDays(parseInt(e.target.value));
  };

  const handleHoursChange = (e) => {
    setHours(parseInt(e.target.value));
  };

  const handleMinutesChange = (e) => {
    setMinutes(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Title:', title);
    console.log('Choice A:', choiceA);
    console.log('Choice B:', choiceB);
    console.log('Days:', days);
    console.log('Hours:', hours);
    console.log('Minutes:', minutes);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        Open Modal
      </Button>

      {showModal && (
        <div className="modal-overlay">
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create Poll</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={title} onChange={handleTitleChange} />
                </Form.Group>

                <Form.Group controlId="formChoiceA">
                  <Form.Label>Choice A</Form.Label>
                  <Form.Control type="text" value={choiceA} onChange={handleChoiceAChange} />
                </Form.Group>

                <Form.Group controlId="formChoiceB">
                  <Form.Label>Choice B</Form.Label>
                  <Form.Control type="text" value={choiceB} onChange={handleChoiceBChange} />
                </Form.Group>

                <Form.Group controlId="formDuration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control as="select" value={days} onChange={handleDaysChange}>
                    <option value={0}>0 days</option>
                    <option value={1}>1 day</option>
                    <option value={2}>2 days</option>
                    {/* Add more options for days */}
                  </Form.Control>
                  <Form.Control as="select" value={hours} onChange={handleHoursChange}>
                    <option value={0}>0 hours</option>
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    {/* Add more options for hours */}
                  </Form.Control>
                  <Form.Control as="select" value={minutes} onChange={handleMinutesChange}>
                    <option value={0}>0 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    {/* Add more options for minutes */}
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save changes
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default CreatePoll;
