import axios from 'axios';
import React, { useState } from 'react'
import Logo from "../../assets/images/Logo.png"
export default function ForgetPassword() {
    const [email, setEmail] = useState('')


    //submit data to get a reset link
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:5000/api/auth/forgot-password`
            const { data } = await axios.post(url, { email })
            console.log(data)
            setEmail(data)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div className='login-page' >
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-12 offset-md-1 col-sm-12 offset-sm-1 col-xs-6 offset-xs-3">
                        <div className="login-form">
                            <div className="login-form-header d-flex flex-column justify-content-center flex-column align-items-center" value={email}>
                                <img src={Logo} alt="" />
                                <h4>Forgot Password</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Enter your Email address</label>
                                    <input type="email" className="form-control py-2 my-2" id="email" name='email' placeholder="Enter email" />
                                </div>
                                <div className="submit-button d-flex align-items-center mt-3">
                                    <button className='btn-home px-5 w-100 rounded'>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

