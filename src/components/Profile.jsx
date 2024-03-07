// import React from 'react'

// function Profile() {
//   return (
// 	<div>Profile</div>
//   )
// }

// export default Profile

import React, { Component } from 'react';


import '../styles/styleProfile.css'

class Profile extends Component {
    state = {  } 
    render() { 
        return (
            <div class="container" style={{ backgroundColor: 'black' }}>
                <div class="form-container">

                    <fieldset className="form-field" >
                        <label for="profile-picture" className="text">Upload a profile picture: <input id="profile-picture" type="file" name="file" /></label>
                    </fieldset>

                </div>

                <fieldset className="form-field">
                    <label for="bio" className="text">Provide a bio:
                        <textarea id="bio" name="bio" rows="3" cols="30" placeholder="Tell us about yourself..." maxLength={"150"}></textarea>
                    </label>
                </fieldset>
                <button type="button" className="upload-button">Upload</button>



            </div>
        );
    }
}
 
export default Profile;