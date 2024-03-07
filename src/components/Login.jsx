import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styleLogin.css";

function LoginComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const buttonClicked = (e) => {
    e.preventDefault();
    // Check if all the fields are filled
    if (username === "" || password === "") {
      alert("Please fill in all the fields");
      return;
    }
    // Check if the password is valid
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    console.log("Form submitted");
    navigate("/welcome");
  };

  useEffect(() => {
    console.log("[LOGIN] useEffect called");
  }, []);

  return (
    <div className="login-container">
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="a picture of people coding"
      ></img>

      <h1>Login</h1>

      <div className="user-info">
        <fieldset>
          <label>
            Username:
            <input
              id="username"
              type="email"
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </label>
          <label>
            Password:
            <input
              id="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
        </fieldset>

        <button onClick={buttonClicked}>Submit</button>
      </div>
    </div>
  );
}

class Login extends Component {
  state = {};

  buttonClicked = () => {
    this.props.history.push("/welcome");
  };

  render() {
    return (
      <div className="login-container">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="a picture of people coding"
        ></img>

        <h1>Login</h1>

        <div className="user-info">
          <fieldset>
            <label>
              Username:
              <input
                id="username"
                type="email"
                placeholder="Enter your username"
                required
              />
            </label>
            <label>
              Password:
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </label>
          </fieldset>

          <Link>
            <button onClick={this.buttonClicked}>Submit</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
