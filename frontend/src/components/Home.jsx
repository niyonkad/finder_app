
//Once the user clicks on <login>, they will be directed to another page where they can enter their username and password.

import React, { Component } from 'react';
import '../styles/styleHome.css';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import WelcomePage from './WelcomePage';

class Home extends Component {
    state = { } 

    
    render() { 
        return ( 

            <div className="welcome">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="a picture of people coding"></img>

                <h1>Welcome to Dev Links!</h1>
                <h2>Are you a student looking for a team to join for your next coding event, hackathon, or project? DevLinks is here to connect you with others who share your passion for coding and your desire to make a difference. </h2>
                
                <div className="user-logic">Do you already have an account ?
                    {/* Redirect to Login page */}
                    <Link to="/login" className="login">Login</Link>
                </div>
                <Link to="/register" className="register">Register</Link>
                {/* <button>Register</button> */}
            </div>

            
         );
    }
}
 
export default Home;