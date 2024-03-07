import React, { Component, useState, useEffect } from 'react';
import '../styles/styleRegister.css'
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  withRouter, 
  useNavigate
} from 'react-router-dom';
 

function RegisterComponent() {
    
    const [firstname,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [school,setSchool] = useState("");
    const [pass2, setPass2] = useState("");
    const [languages, setLanguages] = useState([]);

    const navigate = useNavigate();

    const buttonClicked = (e) => {
        e.preventDefault();
        // Check if all the fields are filled
        if (
          firstname === "" ||
          lastName === "" ||
          username === "" ||
          email === "" ||
          password === "" ||
          pass2 === "" ||
          languages === ""
        ) {
          alert("Please fill in all the fields");
          return;
        }
        // Check if the passwords match
        if (password !== pass2) {
          alert("Passwords do not match");
          return;
        }
        // Check if the email is valid
        if (!email.includes("@")) {
          alert("Please enter a valid email");
          return;
        }
        // Check if the password is valid
        if (password.length < 8) {
          alert("Password must be at least 8 characters long");
          return;
        }
        // Check if the school is selected
        if (school === "") {
          alert("Please select your school");
          return;
        }
        // Check if the languages are entered
        if (languages.length < 1) {
          alert("Please enter the languages you are comfortable with");
          return;
        }

        console.log("Form submitted");
        navigate('/welcome');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all the fields are filled
        if (firstname === "" || lastName === "" || username === "" || email === "" || password === "" || pass2 === "" || languages === "") {
            alert('Please fill in all the fields');
            return;
        }
        // Check if the passwords match
        if (password !== pass2) {
            alert('Passwords do not match');
            return;
        }
        // Check if the email is valid
        if (!email.includes('@')) {
            alert('Please enter a valid email');
            return;
        }
        // Check if the password is valid
        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        // Check if the school is selected
        if (school === "") {
            alert('Please select your school');
            return;
        }
        // Check if the languages are entered
        if (languages.length < 1) {
            alert('Please enter the languages you are comfortable with');
            return;
        }

        console.log('Form submitted');
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api/schools', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await res.json()
            // setSchool(data.schools)
        };

        fetchData()
    }, [])
    
    return (
      <div className="container">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="a picture of people coding"
        ></img>
        <h1>Registration Form</h1>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <label for="name-label" className="form-group" id="name-label">
              First Name:
              <input
                name="name-label"
                id="name"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter your name"
            />
            </label>
            <label for="name-label" className="form-group" id="name-label">
              Last Name:
              <input
                name="name-label"
                id="name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter your name"
            />
            </label>
            <label for="name-label" className="form-group" id="name-label">
              Username:
              <input
                name="name-label"
                id="name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your name"
            />
            </label>
            <label for="email-label" id="email-label">
              Email:
              <input
                name="email-label"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
            />
            </label>
            <label for="new-password" id="email-label">
              Create your password:
              <input
                name="new-password"
                id="new-password"
                type="password"
                pattern="[a-z0-5]{8,}"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
            <label for="new-password" id="email-label">
              Confirm your password:
              <input
                name="new-password"
                id="new-password"
                type="password"
                pattern="[a-z0-5]{8,}"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
                required
            />
            </label>
            <label>
              School
              <select id="dropdown" name="dropdown">
                <option>Select your school</option>
                <option>University of Manitoba</option>
                <option>University of Winnipeg</option>
                <option>Red River School</option>
                <option>University of Saint-Boniface</option>
                {/* {
                    school.map((school, i) => (
                        <option key={i}>{school.schoolName}</option>
                    ))
                } */}
              </select>
            </label>
            <label for="languages">
              How many languages and technlogies are you comfortable with
              <textarea placeholder="Enter your response here..." onChange={(e) => setLanguages(e.target.value.split(','))}></textarea>
            </label>
          </fieldset>
        </form>

        <button onClick={buttonClicked}>Submit</button>
      </div>
    );
}

class Register extends Component {
    state = {  } 


    buttonClicked= () =>{
        this.props.history.push('/welcome');
    }

    render() { 
        return (

            <div className='container'>
                
                
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="a picture of people coding"></img>
                <h1>Registeration Form</h1>

                <form method="post" action="">

                    <fieldset>
                        <label for="firstname" className="form-group" id="name-label">First Name:
                            <input name="name-label" id="firstname" type="text" required placeholder='Enter your name' />
                        </label>
                        <label for="lastname" className="form-group" id="name-label">Last Name:
                            <input name="name-label" id="lastname" type="text" required placeholder='Enter your name' />
                        </label>
                        <label for="username" className="form-group" id="name-label">Username:
                            <input name="name-label" id="username" type="text" required placeholder='Enter your name' />
                        </label>
                        <label for="email-label" id="email-label">Email:
                            <input name="email-label" id="email" type="email" required placeholder="Enter your email"/>
                        </label>
                        <label for="new-password" id="text">Create your password:
                            <input name="password" id="new-password" type="password" pattern="[a-zA-Z0-9]{8,}" placeholder="Must be at least  8 characters long, using any combination of lowercase letters, uppercase letters, and digits." equired  />
                        </label>
                        <label for="confirm-password" id="text">Confirm your password:
                            <input name="confirm-password" id="confirm-password" type="password" pattern="[a-zA-Z0-9]{8,}" required  />
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
        );
    }
}
 
export default RegisterComponent;