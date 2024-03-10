
import React, { Component, useEffect } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import data from '../data/users.json'

const IMG_BASE_URL = "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/";

function WelcomePageComponent() {
    const profiles = data.map((user, i) => 
                <Card key={i} bio={user.bio} image={IMG_BASE_URL.concat(user.image_url)} title={user.name} />)
    return (
      <div>
        <Navbar/>
            {profiles}
      </div>
    );

}


class WelcomePage extends Component {
    state = {  } 

    componentDidMount(){
        fetch('http://localhost:3000/api/schools')

        .then(response => response.json())
        .then(data => {console.log(data)}).catch(error=>{console.error('Error fetching data: ' , error)});
    }


    render() { 
        return (
            <div>
                <Navbar/>
                {/* {Array(10).fill(0).map((_, i) => <Card key={i}/>)} */}
            </div>
        );
    }
}
 
export default WelcomePageComponent;