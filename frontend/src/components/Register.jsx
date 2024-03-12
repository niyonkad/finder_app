import React, { Component, useState, useEffect, useRef } from 'react'
import '../styles/styleRegister.css'
import { 
	BrowserRouter as Router,
	Route,
	Link,
	useNavigate
} from 'react-router-dom'
import { faTimes, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AuthService from '../services/AuthService';
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-_]{4,15}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const API_URL = 'http://localhost:8000/api/'

function RegisterComponent() {
	const userRef = useRef()
	const errRef = useRef()
	const [username, setUsername] = useState("")
	const [validUserName, setValidUserName] = useState(false)
	const [userFocus, setUserFocus] = useState(false)

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [password, setPassword] = useState("")
	const [validPwd, setValidPwd] = useState(false)
	const [pwdFocus, setPwdFocus] = useState(false)

	// matchers
	const [matchPwd, setMatchPwd] = useState("")
	const [validMatch, setValidMatch] = useState(false)
	const [matchFocus, setMatchFocus] = useState(false)

	const [email, setEmail] = useState("")

	const [school, setSchool] = useState("")
	const [skills, setSkills] = useState([])
	const [errMsg, setErrMsg] = useState("")
	const [bio, setBio] = useState('Junior Developer at XYZ Corp.')
	const [currSchools, setCurrSchools] = useState([])

	const navigate = useNavigate()


	const handleSubmit = async (e) => {
		e.preventDefault()
		const v1 = USER_REGEX.test(username)
		const v2 = PASSWORD_REGEX.test(password)
		if (!v1 || !v2) {
			setErrMsg('Invalid username or password')
			return
		}
		try {
			// Create payload
			const payload = {
				username,
				password1: password,
				password2: matchPwd,
				email,
				first_name: firstName,
				last_name: lastName,
				school,
				skills_list: skills,
				bio
			}
			console.log('Payload:\n', payload)
			// Send the payload to the server
			const response = await AuthService.register(payload)
			console.log(response)
			// Clear the form
			setUsername('')
			setPassword('')
			setMatchPwd('')
			navigate('/login')
		} catch (error) {
			console.log('The error:', error.message)
			if (!error?.response) {
				setErrMsg('An error occurred while making the request')
			} else if (error.response?.status === 400) {
				setErrMsg(error.response.detail) // User already exists
			} else {
				setErrMsg('An error occurred while making the request')
			}
			errRef.current.focus()
		}
	 /*      // Check if all the fields are filled
		if (firstName === "" || lastName === "" || username === "" || email === "" || password === "" || pass2 === "" || skills === "") {
			alert('Please fill in all the fields')
			return
				}
				// Check if the passwords match
				if (password !== pass2) {
					alert('Passwords do not match')
					return
				}
				// Check if the email is valid
				if (!email.includes('@')) {
					alert('Please enter a valid email')
					return
				}
				// Check if the password is valid
				if (password.length < 8) {
					alert('Password must be at least 8 characters long')
					return
				}
				// Check if the school is selected
				if (school === "") {
					alert('Please select your school')
					return
				}
				// Check if the languages are entered
		if (skills.length < 1) {
			alert('Please enter the languages you are comfortable with')
			return
				} */

		console.log('Form submitted')
	}

	useEffect(() => {
		userRef.current.focus()
		const fetchSchools = async () => {
			try {
				const res = await axios.get(`${API_URL}schools/`, {
					headers: {
						'Content-type': 'application/json'
					}
				})
				setCurrSchools(res.data)
			} catch (error) {
				console.log('The error:', error)
			}
		}
		fetchSchools()
	}, [])


	useEffect(() => {
		setValidUserName(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		if (validUserName || validPwd) {
			console.log('Valid username or password')
		}
	}, [validPwd, validUserName]);
	useEffect(() => {
		setValidPwd(PASSWORD_REGEX.test(password))
		setValidMatch(password === matchPwd)
	}, [password, matchPwd])

	useEffect(() => {
		console.log('skills:', skills)
	}, [skills.length]);

	useEffect(() => {
		console.log('School:', school)
	}, [school]);

	useEffect(() => {
		setErrMsg('')
	}, [username, password, matchPwd])

	return (
		<div className="container">
			<img
				src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="a group of people coding" />
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live="assertive">{errMsg}</p>
			<h1>Registration Form</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="name-label" className="form-group" id="name-label">
					First Name:
				</label>
				<input
					name="firstname-label"
					id="firstName"
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					placeholder="Enter your name"
				/>
				<label htmlFor="name-label" className="form-group" id="name-label">
					Last Name:
				</label>
				<input
					name="name-label"
					id="name"
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					placeholder="Enter your name"
				/>

				<label htmlFor="username" className="form-group" id="username">
					Username:
					<FontAwesomeIcon icon={faCheck} className={validUserName ? 'valid' : 'hide'} />
					<FontAwesomeIcon icon={faTimes} className={validUserName || !username ? 'hide' : 'invalid'} />
					{/* <CheckIcon className={validUserName ? 'valid' : 'hide'} /> */}
					{/* <ClearIcon className={validUserName || !username ? 'hide' : 'invalid'} /> */}
				</label>
				<input
					name="username"
					id="username"
					type="text"
					value={username}
					ref={userRef}
					autoComplete='off'
					onChange={(e) => setUsername(e.target.value)}
					aria-invalid={validUserName ? 'false' : 'true'}
					aria-describedby='uidnote'
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
					required
					placeholder="Enter your username"
				/>
				<p id="uidnote" className={userFocus && username && !validUserName ? 'instructions' : 'offscreen'}>
					<InfoIcon />
					4 to 15 characters. <br />
					Must begin with a letter. <br />
					Username must be 5-16 characters long and can only contain letters, numbers, and hyphens
				</p>

				<label htmlFor="email-label" id="email-label">
					Email:
				</label>
				<input
					name="email-label"
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder="Enter your email"
				/>
				<label htmlFor="password" id="password-label">
					Create your password:
					<FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
					<FontAwesomeIcon icon={faTimes} className={validPwd || !password ? 'hide' : 'invalid'} />
				</label>
				<input
					name="password"
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					aria-invalid={validPwd ? 'false' : 'true'}
					aria-describedby='pwdnote'
					onFocus={() => setPwdFocus(true)}
					onBlur={() => setPwdFocus(false)}
					required
				/>
				<p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
					<InfoIcon />
					8 to 24 characters. <br />
					Must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
				</p>
				<label htmlFor="new-password" id="email-label">
					Confirm your password:
				</label>
				<input
					name="new-password"
					id="password2"
					type="password"
					value={matchPwd}
					onChange={(e) => setMatchPwd(e.target.value)}
					aria-invalid={validMatch ? 'false' : 'true'}
					aria-describedby='confirmnote'
					onFocus={() => setMatchFocus(true)}
					onBlur={() => setMatchFocus(false)}
					required
				/>
				<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					Must match the first password input field.
				</p>
				<label>
					School
				</label>
				<select id="dropdown" name="dropdown" onChange={(e) => setSchool(e.target.value)}>
					<option>Select your school</option>
					{currSchools.map((school, i) => (
						<option key={i}>{school.name}</option>
					))}
					{/* <option>Select your school</option>
								<option>University of Manitoba</option>
								<option>University of Winnipeg</option>
								<option>Red River School</option>
								<option>University of Saint-Boniface</option> */}
				</select>
				<label htmlFor="languages">
					How many languages and technlogies are you comfortable with
				</label>
				<textarea placeholder="Enter your response here..." onChange={(e) => {
					const skills = e.target.value.split(',').map(skill => skill.trim())
					setSkills(skills)
				}}>

				</textarea>
				<button disabled={!validUserName || !validPwd || !validMatch ? true : false}>Sign Up</button>
			</form>

		</div>
	)
}

class Register extends Component {
	state = {} 


	buttonClicked = () => {
		this.props.history.push('/welcome')
	}

	render() {
		return (

			<div className='container'>


				<img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="a picture of people coding"></img>
				<h1>Registeration Form</h1>

				<form method="post" action="">

					<fieldset>
						<label for="firstName" className="form-group" id="name-label">First Name:
							<input name="name-label" id="firstname" type="text" required placeholder='Enter your name' />
						</label>
						<label for="lastname" className="form-group" id="name-label">Last Name:
							<input name="name-label" id="lastname" type="text" required placeholder='Enter your name' />
						</label>
						<label for="username" className="form-group" id="name-label">Username:
							<input name="name-label" id="username" type="text" required placeholder='Enter your name' />
						</label>
						<label for="email-label" id="email-label">Email:
							<input name="email-label" id="email" type="email" required placeholder="Enter your email" />
						</label>
						<label for="new-password" id="text">Create your password:
							<input name="password" id="new-password" type="password" pattern="[a-zA-Z0-9]{8,}" placeholder="Must be at least  8 characters long, using any combination of lowercase letters, uppercase letters, and digits." equired />
						</label>
						<label for="confirm-password" id="text">Confirm your password:
							<input name="confirm-password" id="confirm-password" type="password" pattern="[a-zA-Z0-9]{8,}" required />
						</label>
						<label>School
							<select id="dropdown" name="dropdown">
								<option>Select your school</option>
								<option>University of Manitoba</option>
								<option>University of Winnipeg</option>
								<option>Red River School</option>
								<option>University of Saint-Boniface</option>
							</select>
						</label>
						<label for="languages">How many languages and technlogies are you comfortable with
							<textarea placeholder="Enter your response here..."></textarea>
						</label>

					</fieldset>
				</form>

				<button onClick={this.buttonClicked}>Submit</button>


			</div>
		)
	}
}
 
export default RegisterComponent