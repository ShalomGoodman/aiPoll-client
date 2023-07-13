import React, { useState } from "react";
import axios from "axios";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../../assets/GOLD.png';

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://ai-poll-b30b8a89907a.herokuapp.com/api/login/",
        {
          username,
          password,
        }
      );
  
      if (response.status === 200) {
        setUsername("");
        setPassword("");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id) // Save the token in local storage
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="sign-in">
         <img src={logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
      <span className="goTo">
        {"Don't have an account? Click "}
        <Link className="link" to="/signup">
          here
        </Link>
        {" to sign up instead."}
      </span>
    </div>
  );
}

export default LoginPage;