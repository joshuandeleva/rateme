import React, { useState, useEffect } from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

import Navbar from "../../components/navigation/Navbar"
import Button from "../../components/button/Button"
import Footer from "../Footer/index"
import { Container, Row, Col, Form } from "react-bootstrap"
import './index.css'
function Index() {
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
        <div className="contactPage">
            <Navbar />
            <div className="contact-details">
                <Container>
                    <Row className="contactPage__details mt-lg-5 mb-lg-4">
                        <Col xm={12} sm={12} md={6} lg={6} xl={6} className="d-flex justify-content-center flex-column">
                            <div className="contactPage__detailsLeft">
                                <h1 className="">We would love to hear from you</h1>
                                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus corporis non nulla. Quo natus atque quos eaque, consequatur at expedita? Blanditiis distinctio ipsam consequatur dignissimos voluptas maiores aliquam, laudantium doloremque!</p>
                            </div>
                        </Col>
                        <Col xm={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="contactPage__detailsRight">
                                <Form>
                                    <div className="form-group my-2">
                                        <label htmlFor="" className="my-2">Full Names</label>
                                        <input type="text" className="form-control" placeholder="Enter Full Names" />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="" className="my-2">Email Address</label>
                                        <input type="email" className="form-control" placeholder="Enter your email" />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="" className="my-2">Phone Number</label>
                                        <input type="phone" className="form-control" style={{ outline: "none" }} placeholder="Enter your Phone NUmber" />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="" className="my-2">Message</label>
                                        <textarea type="textarea" className="form-control" rows="4" placeholder="Message" />
                                    </div>
                                    <div className="submit-message my-2">
                                        <Button className="btn-home rounded mt-3" children="Send Message" />
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="contact-footer pt-lg-4">
                    <Footer />
                </div>
            </div>
        </div>
         }



         </>
    )
}

export default Index