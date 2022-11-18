import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import "../dashboard/index.css";
import "./updatepassword.css";
import MainSideBar from "../SideBar/MainSideBar";
import SideBarHeader from "../SideBar/Header";
import { Input } from "@material-ui/core";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { BASE_API_URL } from "../../utils/BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import axios from "axios";
const Updatepassword = () => {
  let navigate = useNavigate();
  const [password, setpassword] = useState([])
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("password is required")
      .min(
        8,
        "Password length should be more than 8 and contain a special character and atleast one number"
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password length should be more than 8 and contain a special character and atleast one number"
      ),
    confirmPassword: Yup.string()
      .required("Confrim password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const userId = JSON.parse(localStorage.getItem('userData')).user._id
  const onSubmit = async (data) => {
    console.log(JSON.stringify(data, null, 4))
    const updatepasssword = data.password
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          password: updatepasssword,
        })
        .then((res) => {
          setpassword(res.data.password);

          console.log(res.data.password);
          toast.success('Password updated successfully !', {
            position: toast.POSITION.TOP_RIGHT
          });
          // navigate('user/login')

        });

    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
      })
    }


  }
  // const showAllToasts = () => {
  //       toast.success("I'm never gonna toast you!");
  //       toast.error("I'm never gonna toast you!");
  //       toast.warning("I'm never gonna toast you!");
  //       toast.info("I'm never gonna toast you!");
  //     }



  return (
    <div className="dashbaord">
      <div className="row g-0">
        <div className="sidebar-container">
          <MainSideBar />
        </div>
        <div className="banner-container">
          <SideBarHeader />
          <div className="banner-bar mx-5">
            <h3 className="settings">Settings</h3>
            <div className="row">
              <div className="col-sm-8">
                <Link className=" settings-links " to="/user/settings">
                  Account details
                </Link>
                <Link
                  className="mx-3 settings-links"
                  to="/user/settings/notifications"
                >
                  Notification Settings
                </Link>
                <Link
                  className="mx-3 settings-links active-tab"
                  to="/user/settings/passwords"
                >
                  Passwords
                </Link>
                <Link
                  className="mx-3 settings-links"
                  to="/user/settings/deleteaccount"
                >
                  Delete Account
                </Link>
              </div>
            </div>
            <h3 className="mt-5 notification-title">Passwords</h3>

            <div className="  emails-notifications">
              <p>Change your Password</p>
              <hr />

              <div className="col-sm-7">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      name="password"
                      {...register("password")} onChange={(e) => setpassword(e.target.value)}
                      className={`form-control py-2 my-2 ${errors.password ? "input-error" : ""
                        }`}
                    />
                    {errors.password && (
                      <span className="errorMsg">
                        {errors.password.message}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group id="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Your Password"
                      name="confirmPassword"
                      {...register("confirmPassword")}
                      className={`form-control py-2 my-2 ${errors.confirmPassword ? "input-error" : ""
                        }`}
                    />
                    {errors.confirmPassword && (
                      <span className="errorMsg">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <div className="mt-4">
                      {/* <button
                        className="btn btn-discard-changes border  pl-5 pr-5"
                        type="submit"
                      >
                        Discard Changes
                      </button> */}
                      <button
                        className="btn btn-warning mx-3 text-white pl-5 pr-5" type="submit"
                      >
                        Update Password
                      </button>
                      <ToastContainer />


                    </div>
                  </div>
                </Form>
                {/*       <button onClick={showAllToasts}>Show Toast !</button> */}
                <ToastContainer />


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatepassword;
