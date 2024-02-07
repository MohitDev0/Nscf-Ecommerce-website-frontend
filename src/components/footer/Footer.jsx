import React from 'react'
import "./footer.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";

const Footer = () => {
    const signOut = ()=>{
        localStorage.removeItem("jwt");
    }
    return (
        <div className='footer'>
            <div className='m-5 pt-[5rem] pb-4 mb-0 flex justify-evenly flex-wrap'>
                <div className='footer-left m-2'>
                    <h1>Information</h1>
                    <ol className='pt-3'>
                        <Link to="/"> <li className='cursor-pointer'>Home</li></Link>
                        <Link to="/Profile"> <li className='cursor-pointer'>Profile</li></Link>
                        <Link to="/Product">  <li className='cursor-pointer'>Product</li></Link>
                        <Link to="/About"> <li className='cursor-pointer'>About</li></Link>
                        <Link to="/Contact"> <li className='cursor-pointer'>Contact Us</li></Link>
                        <Link to="/login"> <li className='cursor-pointer sign_out' onClick={signOut}>Sign out</li></Link>
                    </ol>
                </div>
                <div className='footer-right w-64'>
                    <h1>Store Information</h1>
                    <ol className='pt-3'>
                        <span><li className='flex items-center'><LocationOnIcon /><span className='ml-2'><b>Address : </b><a href="https://maps.google.com/?q=India" rel="noopener noreferrer" target="_blank">India</a></span></li></span>
                        <span> <li className='flex items-center'><PhoneIcon /><span className='ml-2'><b>Phones :</b><a href="tel:7404460178"> 7404460178</a></span></li></span>
                        <span><li className='flex items-center'><AvTimerIcon /><span className='ml-2'><b>Hours :</b> 7 Days a week from 9:00 am to 7:00 pm</span></li></span>
                        <span><li className='flex items-center'><EmailIcon /><span className='ml-2'><b>E-mail : </b><a href="mailto:mohitsn.dev0@gmail.com">mohitsn.dev0@gmail.com</a></span></li></span>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Footer