import React from 'react'
import Topbar from '../components/topbar/Topbar';

const About = () => {
  return (
    <>
      <Topbar />
      <div className='about_page'>
        <h1 className='text-5xl'>About</h1>
        <p>Hi !!</p>
        <p>I am Mohit </p>
        <p>Basically I am a Mern Stack developer</p>
        <p>Now you are visiting my Ecommerce website</p>
        <p>Thank You !!!</p>
      </div>
    </>
  )
}

export default About