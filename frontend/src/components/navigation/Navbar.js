import React from 'react'
import "./Navbar.css"
import Logo from "../../assets/images/Logo.png"
import { Link } from "react-router-dom"
function Navbar() {
    return (
        <div className='navbar'>
            <div className="navbarItems">
                <Link to="/">
                    <img className='logo' src={Logo} alt="" />
                </Link>
                <ul>
                    <li> <Link to="/" className='active rounded'>Home</Link></li>
                    <li> <Link to="/safety">Safety</Link></li>
                    <li> <Link to="/contact">Contact us</Link></li>
                    <li> <Link to="/downloads">Downloads</Link></li>
                    <li> <Link to="/user/accountsetup" className='signup-hm rounded'>Sign Up</Link></li>
                    <li> <Link to="/user/login" className='login-hm rounded'>Login</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar