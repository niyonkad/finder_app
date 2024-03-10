
import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';


function WelcomePageComponent() {
    return (
      <div>
        <Navbar/>
        <Card
          bio={"DevOps Manager at Amazon Web Services"}
          image={"https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp"}
          title={"Jane Smith"}
        />
        <Card
            bio = "Sofware Developer with a passion for teaching"
            image = "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/001.webp"
            title = "John Doe"
        />
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