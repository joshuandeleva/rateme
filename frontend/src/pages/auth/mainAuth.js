import React from 'react'
import { Container, Row } from "react-bootstrap"
import Logo from "../../assets/images/Logo.png"
import { Link } from "react-router-dom"
import Button from '../../components/button/Button'
import Footer from "../Footer/index"
import './mainAuth.css'
function mainAuth() {
    return (
        <div className='mainaccPage'>
            <div className="mainaccPage__details">
                <Container style={{ minHeight: '65vh' }}>
                    <Row>
                        <div className="mainaccLogo d-flex justify-content-center">
                            <Link to="/">
                                <img src={Logo} alt="" />
                            </Link>
                        </div>
                        <div className="mainaccPage__socialAuth d-flex flex-column align-items-center justify-content-center">
                            <h1 className='pt-5'>Welcome ! How do you want to get started</h1>
                            <div className="social-auth-btns d-flex flex-column">
                                <Button className="btn-google rounded py-2 px-3 my-2" children="Continue with Google" />
                                <Button className="btn-facebk rounded py-2 px-3 my-2" children="Continue with Facebook" />
                                <Button className="btn-apple rounded py-2 px-3 my-2" children="Continue with Apple" />
                            </div>
                        </div>
                        <div className="acc-divider d-flex justify-content-center my-3">
                            <h2><span>or</span></h2>
                        </div>
                        <div className="acc-email d-flex justify-content-center">
                            <Link to="/user/stepOne">Sign up with your email</Link>
                        </div>
                    </Row>
                </Container>
                <div className="agree d-flex justify-content-center fw-bold top-0">
                    <p>By signing up , you agree to our Terms .See how we use your data in our Privacy Policy</p>
                </div>
                <div className="contact-footer">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default mainAuth