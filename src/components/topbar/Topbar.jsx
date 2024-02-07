import React, { useState } from 'react'
import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Topbar = () => {
    const [isActive, setActive] = useState(false);
    const ToggleClass = () => {
        setActive(!isActive);
    };

    return (
        <div className='topbar'>
            <div className='topbarWrapper flex px-6 justify-between items-center max-[800px]:justify-start '>
                <div className='menubar hidden max-[835px]:block'>
                    <MenuIcon className='mr-5 cursor-pointer' style={{ fontSize: 45 }} onClick={ToggleClass} />
                </div>
                <div className='topbarLeft'>
                    <img className='rounded-md h-24 w-24 max-w-none' src='images/nscf logo.jpg' alt='Company logo'></img>
                </div>
                {/* <div className="topbarcenter border-2 border-black p-2 rounded-md flex">
                    <input type="text" className="outline-0" placeholder='Search' htmlFor="search" /><SearchIcon id="search" className='cursor-pointer' />
                </div> */}
                <div className={`topbarRight z-10 ease-in-out duration-700 scroll-smooth text-3xl font-bold max-[870px]:text-2xl ${isActive && "max-[800px]:block h-full !w-full left-0"}`}>
                    {isActive && <CloseIcon className='close cursor-pointer absolute right-2 top-2 border rounded-lg hidden z-50' onClick={ToggleClass} />}
                    <ul className={`topbarListItems flex flex-wrap m-3 ${!isActive ? "space-x-4" : "space-x-0"}`}>
                        <li className='ListItem' id='Home'><NavLink to="/" className={({ isActive }) => isActive ? "Active" : "notActive"}>Home</NavLink></li>
                        <li className='ListItem' id='Product'><NavLink to="/Product" className={({ isActive }) => isActive ? "Active" : "notActive"}>Product</NavLink></li>
                        <li className='ListItem' id='About'><NavLink to="/About" className={({ isActive }) => isActive ? "Active" : "notActive"}>About</NavLink></li>
                        <li className='ListItem' id='Contact'><NavLink to="/Contact" className={({ isActive }) => isActive ? "Active" : "notActive"}>Contact us</NavLink></li>
                        <li className='ListItemCart' id='Cart'><NavLink to="/Cart"><ShoppingCartIcon /></NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Topbar;