import React, { Component, useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Button from '@mui/material/Button'
import "../styles/styleLogin.css"
import useAuth from "../hooks/useAuth"
import AuthService from "../services/AuthService"

function LoginComponent() {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/feed'
  const userRef = useRef()
  const errRef = useRef()
  // state management
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await AuthService.login({ username, password })
      // console.log(response)
      const accessToken = response?.data?.access
      const refreshToken = response?.data?.refresh
      // console.log('Tokens:', { accessToken, refreshToken })
      setAuth({ username, password, accessToken, refreshToken })
      setUsername('')
      setPassword('')
      // Navigate to where the user was trying to go before they were redirected to login
      navigate(from, { replace: true })
    } catch (error) {
      // setErrMsg('Invalid username or password')
      if (!error?.response) {
        setErrMsg('An error occurred while making the request')
      } else if (error.response?.status === 401) {
        setErrMsg(error.response.detail) // Unauthorized access
      } else {
        setErrMsg('An error occurred while making the request')
      }
      console.log('The error:', error.code)
      errRef.current.focus()
    }

  }

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('') // reset the error message
  }, [username, password])

  return (
    <div className="login-container">
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="a group of people coding" />
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive">{errMsg}</p>
      <h1>Login</h1>

      <div className="user-info">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:
          </label>
            <input
              id="username"
            type="text"
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
            ref={userRef}
            autoComplete="off" // disable autocomplete so it doesn't suggest past usernames
            value={username}
              required
          />
          <label htmlFor="password">
            Password:
          </label>
            <input
              id="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            value={password}
              required
          />
          {/* <Button variant="contained">Submit</Button> */}
          <button>Submit</button>
        </form>

      </div>
    </div>
  )
}

class Login extends Component {
  state = {}

  buttonClicked = () => {
    this.props.history.push("/welcome")
  }

  render() {
    return (
      <div className="login-container">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A group of people coding" />

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
    )
  }
}

export default LoginComponent
