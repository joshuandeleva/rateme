import React, { useState, useEffect } from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";
import Logo from "../../assets/images/Logo.png";
import Footer from "../Footer/index";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../utils/BaseUrl";

import Input from "@material-ui/core/Input";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const Login = () => {
  const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)

    }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userDetails, setUserDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

 
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  
  let navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${BASE_API_URL}/api/auth/login`, data);
      console.log(response);
      setSucessMessage("Login was successful");
      localStorage.setItem("userData", JSON.stringify(response.data));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data?.accessToken)
      );
      setIsLoggedin(true);
      setErrorMessage("");
      setUserDetails(response.data);
      Swal.fire("Awesome!", "You're successfully login!", "success").then(
        (result) => {
          if (result.isConfirmed || result.isDismissed) {
            navigate("/user/dashboard");
          }
        }
      );
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        setErrorMessage(error.response.data);
        setSucessMessage("");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        })
        console.log("error", error.response.data);
      }
    }
  };
  // useEffect(() => {
  //   if (localStorage.getItem('userData')) {
  //     navigate("/user/dashboard");
      
  //   }

  // },[])
  return (
    <>
            {loading ?
                // <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading Spinner" />
                <div className="d-flex justify-content-center loader">
                    <ScaleLoader className='d-flex justify-content-center' color="#FFC247" speedMultiplier={4} />
                </div>
                :
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-12 offset-md-1 col-sm-12 offset-sm-1 col-xs-6 offset-xs-3">
            <div className="login-form">
              <div className="login-form-header d-flex flex-column justify-content-center flex-column align-items-center">
                <img src={Logo} alt="" />
                <h4>We missed you , glad to see you back</h4>
              

              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="email1">Email address</label>
                  <input
                    type="email"
                    className={`form-control py-2 my-2 ${
                      errors.email ? "input-error" : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="errorMsg">{errors.email.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                 <div className="input-group">
                 <Input
                   type={passwordShown ? "text" : "password"}
                    
                    className="form-control py-2 my-2"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                        message:
                          "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character",
                      },
                    })}
                  />

                        <span style={{height:'50px', marginTop:'8px'}}  className="input-group-text" onClick={togglePassword}>
                        
                          {passwordShown ?  <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </span>
                 </div>

                   
                  {errors.password && (
                    <span className="errorMsg">{errors.password.message}</span>
                  )}
                </div>
                <div className="submit-button d-flex align-items-center justify-content-between mt-5">
                  <button className="btn-home px-5 rounded">Login</button>
                  <div className="forget-password">
                    <Link
                      to="/user/forgetpassword"
                      className="text-decoration-none text-link"
                    >
                      Forget my password
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-home">
        <Footer />
      </div>
    </div>
    }



    </>
  );
};

export default Login;