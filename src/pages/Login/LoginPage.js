import React, { useState, useEffect } from "react";
import axios from "axios";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/GOLD.png";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const notifySuccess = () => {
    toast.success("Signed in Successfully!");
  };

  const notifyError = () => {
    toast.error("Username or Password is incorrect!");
  };

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

        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("username", response.data.username);
        navigate("/home");
        notifySuccess();
      }
    } catch (error) {
      notifyError();
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="sign-in">
      <img src={logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Username..."
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="Password..."
            autoComplete="current-password"
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
