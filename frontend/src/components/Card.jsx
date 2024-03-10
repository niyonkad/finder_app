import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import '../styles/Card.css'


function Card({ title, bio, image }) {

  useEffect(() => {
    console.log('Card component mounted')
    console.log(`Image url: ${image}`)
  }, [])

  const submit = () => {
    console.log('Button clicked')
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card-container">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', width: '100%', height: '100%' }}
        />
        <div className="card-description">
          <h3 className="card-title">{title}</h3>
          <p className="card-bio">{bio}</p>
        </div>
        <div className="stuff">
          <Button onClick={submit} variant='contained' color='success'>Accept</Button>
          <Button onClick={submit} variant='contained'>Pass</Button>
        </div>
      </div>
    </div>
  );
}

export default Card