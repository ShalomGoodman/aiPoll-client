import React, { useEffect, useState } from "react";
import { parseUnits, formatUnits } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import base from "../../auth/baseURL";
import { tokenTransfer, erc20contract } from "../../interfaces/ERC20Interface";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePoll({ onPollCreated }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [transfer, setTransfer] = useState({});
  const [tokenPrice, setTokenPrice] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false); // State to track form error

  function addSmartContractListener() {
    erc20contract.on("Transfer", (message, _to, _value) => {
      console.log(message, _to, _value);
      // setTransfer(data);
    });
  }

  useEffect(() => {
    addSmartContractListener();
  }, []);

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
    updateTokenPrice(parseInt(e.target.value), hours, minutes);
  };

  const handleHoursChange = (e) => {
    setHours(parseInt(e.target.value));
    updateTokenPrice(days, parseInt(e.target.value), minutes);
  };

  const handleMinutesChange = (e) => {
    setMinutes(parseInt(e.target.value));
    updateTokenPrice(days, hours, parseInt(e.target.value));
  };

  const updateTokenPrice = (selectedDays, selectedHours, selectedMinutes) => {
    const totalMinutes =
      selectedDays * 24 * 60 + selectedHours * 60 + selectedMinutes;
    const tokenPerMinute = 1; // Number of tokens per minute
    const tokenAmount = totalMinutes * tokenPerMinute;
    setTokenPrice(tokenAmount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is missing
    if (
      !title ||
      !choiceA ||
      !choiceB ||
      (days === 0 && hours === 0 && minutes === 0)
    ) {
      setFormError(true);
      return;
    }

    setLoading(true); // Set loading state to true
    toast.loading("Transaction in progress. Please wait...");

    // Get user's Metamask address
    const userAddress = "0xfc22954a701CfD0f59357FfA97044D78b21828ce";

    // Calculate the token amount based on the token price
    const tokenAmount = tokenPrice;

    // Try to make the transfer
    try {
      const transaction = await tokenTransfer(userAddress, tokenAmount);

      // Wait for the transaction to finish
      const result = await transaction.wait();

      if (result.status !== 1) {
        // Check if transaction was successful
        console.error("Token transfer failed.");
        toast.error("Transaction failed. Please try again.");
        setSubmitError(true);
        setLoading(false); // Set loading state to false
        return;
      }

      console.log("Token transfer successful!");
      toast.dismiss(); // Dismiss the loading toast notification
      toast.success('Transaction complete! Poll is being created.', { autoClose: 1500 })
    } catch (err) {
      console.error(err);
      setSubmitError(true);
      setLoading(false); // Set loading state to false
      return;
    }

    try {
      const duration = days * 1440 + hours * 60 + minutes;
      const deadline = new Date(
        Date.now() + duration * 60 * 1000
      ).toISOString();
      const poll = {
        title: title,
        option_a_label: choiceA,
        option_b_label: choiceB,
        deadline: deadline,
        creator: localStorage.getItem("user_id"),
      };

      const response = await base.post("/api/polls/", poll); // modify this path if it's not the correct endpoint

      if (response.status === 200) {
        // Check if poll was successfully created
        setSubmitSuccess(true);
        onPollCreated(); // Call the function passed from the parent component
        toast.success("Poll was successfully created!"); // Display success toast notification
      } else {
        setSubmitError(true);
      }

      setLoading(false); // Set loading state to false

      handleClose();
    } catch (error) {
      console.error(error);
      setSubmitError(true);
      setLoading(false); // Set loading state to false
      console.log(error.response.data); // Log the error response data
    }
  };



  const isSubmitDisabled =
    !title ||
    !choiceA ||
    !choiceB ||
    (days === 0 && hours === 0 && minutes === 0);

  return (
    <>
      <button className="create-poll-button" onClick={handleOpen}>
        Create Poll
      </button>

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
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formChoiceA">
                  <Form.Label>Choice A</Form.Label>
                  <Form.Control
                    type="text"
                    value={choiceA}
                    onChange={handleChoiceAChange}
                  />
                </Form.Group>

                <Form.Group controlId="formChoiceB">
                  <Form.Label>Choice B</Form.Label>
                  <Form.Control
                    type="text"
                    value={choiceB}
                    onChange={handleChoiceBChange}
                  />
                </Form.Group>

                <Form.Group controlId="formDuration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    as="select"
                    value={days}
                    onChange={handleDaysChange}
                  >
                    <option value={0}>0 days</option>
                    <option value={1}>1 day</option>
                    <option value={2}>2 days</option>
                    <option value={3}>3 days</option>
                    <option value={4}>4 days</option>
                    <option value={5}>5 days</option>
                    <option value={6}>6 days</option>
                    <option value={7}>7 days</option>
                  </Form.Control>
                  <Form.Control
                    as="select"
                    value={hours}
                    onChange={handleHoursChange}
                  >
                    <option value={0}>0 hours</option>
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hours</option>
                    <option value={5}>5 hours</option>
                    <option value={6}>6 hours</option>
                    <option value={7}>7 hours</option>
                  </Form.Control>
                  <Form.Control
                    as="select"
                    value={minutes}
                    onChange={handleMinutesChange}
                  >
                    <option value={0}>0 minutes</option>
                    <option value={1}>1 minute</option>
                    <option value={2}>2 minutes</option>
                    <option value={3}>3 minutes</option>
                    <option value={4}>4 minutes</option>
                    <option value={5}>5 minutes</option>
                    <option value={6}>6 minutes</option>
                    <option value={7}>7 minutes</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Token Price:</Form.Label>
                  <span>{tokenPrice} tokens</span>
                </Form.Group>

                {formError && <p>All fields are required.</p>}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading || isSubmitDisabled}
                >
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
                {submitError && <p>Submit failed. Please try again.</p>}
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default CreatePoll;
