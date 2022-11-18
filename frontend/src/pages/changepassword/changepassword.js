import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./changepassword.css";
import SideBarHeader from "../SideBar/Header";
import MainSideBar from "../SideBar/MainSideBar";
import axios from "axios";
import { BASE_API_URL } from "../../utils/BaseUrl";
import Footer from "../Footer/index"
import { Container, Row } from "react-bootstrap"
import Logo from "../../assets/images/Logo.png"
import Button from '../../components/button/Button'



const  Changepassword = () => {
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)

    }, [])



    return (
        <>
        {loading ?
            // <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading Spinner" />
            <div className="d-flex justify-content-center loader">
                <ScaleLoader className='d-flex justify-content-center' color="#FFC247" speedMultiplier={4} />
            </div>
            :
      <>
      <div className="changepassword" />
      <Container style={{ minHeight: '25vh' }}>
            <Row>
                <div className="mainaccLogo d-flex justify-content-center">
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className=" d-flex flex-column align-items-center justify-content-center">
                    <h1 className='pt-5'>Reset password</h1>
                    <p>Enter a valid email and check your email Address</p>
                </div>
            </Row>
        </Container><div className="container">
                <form action="" method="post">
                    <div className="form-group mt-3">
                        <label htmlFor="" className="pb-2">
                           Enter Your password
                        </label>
                        <input
                            type="email"
                            name="email"

                            className="form-control"
                            id="" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="" className="pb-2">
                           Confirm your password
                        </label>
                        <input
                            type="email"
                            name="email"

                            className="form-control"
                            id="" />
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="mt-4">
                            <button className="btn btn-warning text-white mb-3 " type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div><div className="contact-footer">
                <Footer />
            </div></>

}



</>
     
    );
  
}
export default Changepassword;
