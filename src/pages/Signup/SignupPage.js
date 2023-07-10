import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform your signup logic here
      // Make API requests, validations, or any other necessary operations

      setName("");
      setEmail("");
      setPassword("");
      setVerifyPassword("");
      toast.success("Successfully signed up!", { autoClose: 1500 });
      navigate("/signin");
    } catch (error) {
      toast.error("An error occurred", { autoClose: 1500 });
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="username..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            placeholder="email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="verify password..."
            value={verifyPassword}
            onChange={(event) => setVerifyPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <span className="goTo">
        {"Already have an account? Click "}
        <Link className="link" to="/signin">
          here
        </Link>
        {" to sign in instead."}
      </span>
      <ToastContainer />
    </div>
  );
}


