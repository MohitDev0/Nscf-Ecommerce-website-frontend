import React from 'react'
import Topbar from '../components/topbar/Topbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  return (
    <>
      <Topbar />
      <div className='footer-right m-10 mt-5'>
        <h1 className='ml-20 text-5xl'>Get in Touch</h1>
        <ol className='pt-3 text-center'>
          <span><li className='flex items-center'><LocationOnIcon /><span className='ml-2'><b>Address : </b><a href="https://maps.google.com/?q=jamana society Hanuman Colony, Hansi" rel="noopener noreferrer" target="_blank">India</a></span></li></span>
          <span> <li className='flex items-center'><PhoneIcon /><span className='ml-2'><b>Phones :</b><a href="tel:7404460178"> 7404460178</a></span></li></span>
          <span><li className='flex items-center'><AvTimerIcon /><span className='ml-2'><b>Hours :</b> 7 Days a week from 9:00 am to 7:00 pm</span></li></span>
          <span><li className='flex items-center'><EmailIcon /><span className='ml-2'><b>E-mail : </b><a href="mailto:mohitsn.dev0@gmail.com">mohitsn.dev0@gmail.com</a></span></li></span>
        </ol>
      </div>
    </>
  )
}

export default Contact