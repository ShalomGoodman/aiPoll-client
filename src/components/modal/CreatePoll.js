import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import base from '../../auth/baseURL';

function CreatePoll({ onPollCreated }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert duration to minutes
      const duration = days * 1440 + hours * 60 + minutes;

      // Calculate the deadline datetime string
      const deadline = new Date(Date.now() + duration * 60 * 1000).toISOString();

      const poll = {
        title: title,
        option_a_label: choiceA,
        option_b_label: choiceB,
        deadline: deadline,
        creator: localStorage.getItem('user_id'),
      };
      
      const response = await base.post('/api/polls/', poll); // modify this path if it's not the correct endpoint

      if(response.status === 200) { // Check if poll was successfully created
        onPollCreated(); // Call the function passed from the parent component
      }

      handleClose();

    } catch (error) {
      console.error(error);
      console.log(error.response.data); // Log the error response data
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        Create Poll
      </Button>

      {showModal && (
        <div className="modal-overlay">
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>New Poll</Modal.Title>
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
                    <option value={3}>3 days</option>
                    <option value={4}>4 days</option>
                    <option value={5}>5 days</option>
                    <option value={6}>6 days</option>
                    <option value={7}>7 days</option>
                  </Form.Control>
                  <Form.Control as="select" value={hours} onChange={handleHoursChange}>
                    <option value={0}>0 hours</option>
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hour</option>
                    <option value={5}>5 hours</option>
                    <option value={6}>6 hours</option>
                    <option value={7}>7 hours</option>
                    <option value={8}>8 hours</option>
                    <option value={9}>9 hours</option>
                    <option value={10}>10 hours</option>
                    <option value={11}>11 hours</option>
                    <option value={12}>12 hours</option>
                    {/* Add more options for hours */}
                  </Form.Control>
                  <Form.Control as="select" value={minutes} onChange={handleMinutesChange}>
                    <option value={0}>0 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
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
