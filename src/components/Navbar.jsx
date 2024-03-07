
import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styleNavbar.css';

// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faBars} from '@fortawesome/free-solid-svg-icons';


function NavbarComponent() {
    const [menu, setMenu] = useState(false);

    useEffect(() => console.log('Menu has been toggled!'), [])

    const handleMenu = () => {
        console.log('Clicked on the menu burger!')
        setMenu(true)
    };
    const handleClose = () => setMenu(false);

    return (
        <div className="menu">
            <nav className={`nav ${menu ? 'show' : ''}`}
            id="nav-menu">
                <i className="fa-solid fa-xmark" id="btn_close" onClick={handleClose}></i>
        
                <ul className="nav-list">
                <li className="nav_item">
                    <Link className='nav_link' to="/profile">Profile</Link>
                </li>
                <li className="nav_item">
                    <a href="" className="nav_link">Matches</a>
                </li>
                <li className="nav_item">
                    <a href="" className="nav_link">Settings</a>
                </li>
                <li className="nav_item">
                    <a href="" className="nav_link">Help</a>
                </li>
                </ul>
            </nav>
            <i className="fa-solid fa-bars" id="menu_mark" onClick={handleMenu}></i>
        </div>
    );
}

class Navbar extends Component {
    state = {  } 

    render() { 
        return (
          <div className="menu">
            <nav className="nav" id="nav-menu">
              <i className="fa-solid fa-xmark" id="btn_close"></i>

              <ul className="nav-list">
                <li className="nav_item">
                    <a href="" className="nav_link">Profile</a>
                </li>
                <li className="nav_item">
                  <a href="" className="nav_link">Matches</a>
                </li>
                <li className="nav_item">
                  <a href="" className="nav_link">Settings</a>
                </li>
                <li className="nav_item">
                  <a href="" className="nav_link">Help</a>
                </li>
              </ul>
            </nav>

            <i className="fa-solid fa-bars" id="menu_mark"></i>
          </div>
        );
    }
}
 
export default NavbarComponent;