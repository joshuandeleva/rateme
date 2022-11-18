import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import "./forgotpassword.css";
import SideBarHeader from "../SideBar/Header";
import MainSideBar from "../SideBar/MainSideBar";
import axios from "axios";
import { BASE_API_URL } from "../../utils/BaseUrl";
import Footer from "../Footer/index"
import { Container, Row } from "react-bootstrap"
import Logo from "../../assets/images/Logo.png"
import Button from '../../components/button/Button'



export default class Changepassword extends Component {
  state = {
    email: "",
    submitted: false,
  };
  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };
  sendPasswordResetEmail = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const res = axios.post(`http://localhost:5000/api/auth/forgotpassword/`, {
      email,
    });
    this.setState({ email: "", submitted: true });
  };
  render() {
    const { email } = this.state;

    return (
      <div className="forgotpassword">

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
                </Container>
        <div className="container">
        <form onSubmit={this.sendPasswordResetEmail} action="" method="post">
          <div className="form-group mt-3">
            <label htmlFor="" className="pb-2">
              Enter your Email
            </label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              value={email}
              className="form-control"
              id=""
            />
          </div>

          <div className="d-flex justify-content-center">
            <div className="mt-4">
              <button className="btn btn-warning text-white mb-3 " type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        </div>
        <div className="contact-footer">
                    <Footer />
                </div>
      </div>
    );
  }
}
