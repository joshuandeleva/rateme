import React from 'react'
import "./index.css"
import { Link } from "react-router-dom"
import Logo from "../../assets/images/Logo.png"
import { FaPinterestP, FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa"
function index() {
    let newDate = new Date();
    let year = newDate.getFullYear()
    return (
        <div className='footer'>
            <div className="footer__top">
                <Link to="/">
                    <img src={Logo} alt="" />
                </Link>
                <Link to="/">
                    <FaPinterestP className='footer-icon' />
                </Link>
                <Link to="/">
                    <FaTwitter className='footer-icon' />
                </Link>
                <Link to="/">
                    <FaFacebookF className='footer-icon' />
                </Link>
                <Link to="/">
                    <FaInstagram className='footer-icon' />
                </Link>
            </div>
            <div className="footer__mid">
                <ul className='d-flex'>
                    <li><Link to='/products'>Products</Link></li>
                    <li><Link to="/safety">Safety</Link></li>
                    <li><Link to="/Contact-us">Contact us</Link></li>
                    <li><Link to="/Downloads">Downloads</Link></li>
                    <li><Link to="/termconditions">Terms and Conditions</Link></li>
                </ul>
            </div>
            <div className="footer__copyright">
                <p>&copy;StarMatched {year} | All rights Reserved | Nairobi,Kenya</p>
            </div>
        </div>
    )
}

export default index