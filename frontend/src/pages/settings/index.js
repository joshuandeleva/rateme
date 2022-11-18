/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import "./index.css";
import ScaleLoader from "react-spinners/ScaleLoader";

import MainSideBar from "../SideBar/MainSideBar";
import SideBarHeader from "../SideBar/Header";
import axios from "axios";
import { BASE_API_URL } from "../../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@material-ui/core";
import { Get_year } from "../../helpfunctions/helpfunction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
const Settings = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);
  const [user, setUser] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userData")).user._id;
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [userData, setUserData] = useState([]);

  let navigate = useNavigate();
  const [email, setemail] = useState();
  const [prefered_name, setprefered_name] = useState([]);
  const [phone_number, setphoneNumber] = useState([]);
  const [work, setWork] = useState([]);
  const [education, setEducation] = useState([]);


  const [gender, setGender] = useState('Male');
  const [find_in, setFindin] = useState("Male");

  function refreshPage() {
    window.location.reload(false);
  }


  useEffect(() => {
    const GetUserDetails = async () => {
      const res = await axios
        .get(`${BASE_API_URL}/api/user/find/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          console.log("settings", res.data);
        });
    };
    GetUserDetails();
  }, []);

  // const handleAddRow = () => {
  //   setUserData([
  //     ...userData,
  //     {
  //       full_name: "full_name",
  //       prefered_name: "prefered_name",
  //       email: "email",
  //     },
  //   ]);
  // };
  const HandleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          email: email,
        })
        .then((res) => {
          setemail(res.data);

          console.log(res.data);
        });
      Swal.fire(
        "Awesome!",
        "You're successfully  added your passions details!",
        "success"
      ).then((res) => {
        if (res.isConfirmed || res.isDismissed) {
          navigate("/user/login");
          refreshPage()
        }
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
        console.log("error", error.response.data);
      }
    }
  };
  const preferredNameSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          prefered_name: prefered_name,
        })
        .then((res) => {
          setprefered_name(res.data);

          console.log(res.data);
          toast.success('Preferred Name updated  successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
        refreshPage()
        })
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error, {
          position: "top-right",
        })
        console.log("error", error.response.data);
      }
    }

  };
  const PhonenumberSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          phone_number: phone_number,
        })
        .then((res) => {
          setphoneNumber(res.data);

          toast.success('Phone Number updated  successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
        refreshPage()
        })
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error, {
          position: "top-right",
        })
        console.log("error", error.response.data);
      }
    }

  };
  const workSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          work: work,
        })
        .then((res) => {
          setWork(res.data);

          console.log(res.data);
          toast.success('Occupation details updated  successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
        refreshPage()
        })
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error, {
          position: "top-right",
        })
        console.log("error", error.response.data);
      }
    }

  };
  const educationSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          school: education,
        })
        .then((res) => {
          setEducation(res.data);
          toast.success('Instution details  updated  successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
        refreshPage()
        })
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error, {
          position: "top-right",
        })
        console.log("error", error.response.data);
      }
    }

  };
  function onChangeValue(event) {
    setFindin(event.target.value);
    console.log(event.target.value);
  }
  function onChangeGender(event) {
    setGender(event.target.value);
    console.log(event.target.value);
  }

  const FindInSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          find_in: find_in,
        })
        .then((res) => {
          setFindin(res.data);

          console.log(res.data);
        });
      Swal.fire(
        "Awesome!",
        "You're successfully  added your passions details!",
        "success"
      ).then((res) => {
        if (res.isConfirmed || res.isDismissed) {
          navigate("/user/login");
          refreshPage()
        }
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
        console.log("error", error.response.data);
      }
    }

  };
  const GenderSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          gender: gender,
        })
        .then((res) => {
          setGender(res.data);

          console.log(res.data);
        });
      Swal.fire(
        "Awesome!",
        "You have  successfully gender  details!",
        "success"
      ).then((res) => {
        if (res.isConfirmed || res.isDismissed) {
          navigate("/user/login");
          refreshPage()
        }
        
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
        console.log("error", error.response.data);
      }
    }
  }
  const DisacardChanges = () => {
    navigate("/user/profile");
  };
  const Logout = (e) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    navigate("/user/login");
    setIsLoggedin(false);
  };
  //submit place
  //submit street
  //email address
  //dob and change the zodiacsign
  //gender 
  return (
    <>
      {loading ? (
        // <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading Spinner" />
        <div className="d-flex justify-content-center loader">
          <ScaleLoader
            className="d-flex justify-content-center"
            color="#FFC247"
            speedMultiplier={4}
          />
        </div>
      ) : (
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
                    <Link
                      className=" settings-links active-tab"
                      to="/user/settings"
                    >
                      Account details
                    </Link>
                    <Link
                      className="mx-3 settings-links"
                      to="/user/settings/notifications"
                    >
                      Notification Settings
                    </Link>
                    <Link
                      className="mx-3 settings-links"
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
                <h3 className="mt-4">Account Details</h3>
                <span>Update your personal details here</span>
                <hr />
                {user.map((item, id) => (
                  <>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="">Preferred Name</label>
                        <span>
                          <i className="fa fas-home"></i>
                        </span>
                        <span className=" settings-data">
                          {item.prefered_name ? item.prefered_name : 'No Prefered Name'}
                          <span><FontAwesomeIcon className="icon-settings" data-toggle="modal" data-target="#preferrednameModal" icon={faPenAlt} /></span>
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="">Phone Number </label>
                        <span>
                          <i className="fa fas-home"></i>
                        </span>
                        <span className=" settings-data">
                          {item.phone_number ? item.phone_number : 'No Phone Number'}
                          <span><FontAwesomeIcon className="icon-settings" data-toggle="modal" data-target="#phonenumberModal" icon={faPenAlt} /></span>
                        </span>
                      </div>

                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="">Work</label>
                        <span>
                          <i className="fa fas-home"></i>
                        </span>
                        <span className=" settings-data">
                          {item.work ? item.work : 'No Occupation kindly upload'}
                          <span><FontAwesomeIcon className="icon-settings" data-toggle="modal" data-target="#workModal" icon={faPenAlt} /></span>
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="">Institution </label>
                        <span>
                          <i className="fa fas-home"></i>
                        </span>
                        <span className=" settings-data">
                          {item.school ? item.school : 'No institution'}
                          <span><FontAwesomeIcon className="icon-settings" data-toggle="modal" data-target="#educationModal" icon={faPenAlt} /></span>
                        </span>
                      </div>
                      <div className="col-sm-9 mt-3">
                        <label htmlFor="">Email Address</label>
                        <span>
                          <i className="fa fas-envelope"></i>
                        </span>
                        <div className="settings-datas-icon">
                          <span className=" settings-emails">
                            {item.email}
                            <span><FontAwesomeIcon className="icon-settings" data-toggle="modal" data-target="#emailModal" icon={faPenAlt} /></span>
                          </span>

                        </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="">What are looking for </label>
                        <span>
                          <i className="fa fas-home"></i>
                        </span>
                        <div className=" settings-data-icon">

                          <span className="settings-data">
                            {item.find_in}
                            <span><FontAwesomeIcon className="icon-settings" data-toggle="modal" data-target="#findinModal" icon={faPenAlt} /></span>

                          </span>

                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="">Gender</label>
                        <span>
                          <i className="fa fas-home"></i>
                        </span>
                        <div className=" settings-data-icon">

                          <span className=" settings-data"> {item.gender}  <span><FontAwesomeIcon className="icon-settings" data-toggle="modal" data-target="#genderModal" icon={faPenAlt} /></span></span>


                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <ToastContainer />
            </div>
          </div>
          <>
            <div class="modal fade" id="preferrednameModal" tabindex="-1" role="dialog" aria-labelledby="preferrednameModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="preferrednameModalLabel">Preferred Name</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form action="" method="post">
                    <div class="modal-body">
                      <div className="form-group">
                        <label htmlFor="">Preferred Name</label>
                        <input type="text" onChange={(e) => setprefered_name(e.target.value)} value={prefered_name} className="form-control" name="" id="" />
                      </div>

                    </div>
                    <div class="modal-footer">

                      <button type="button" onClick={preferredNameSubmit} class="btn btn-warning">Save changes</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
          <>
            <div class="modal fade" id="phonenumberModal" tabindex="-1" role="dialog" aria-labelledby="phonenumberModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="phonenumberModalLabel">Phone Number Edit </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form action="" method="post">
                      <div className="form-group">
                        <label htmlFor="">Phone Number Edit </label>
                        <input type="text" placeholder="+254700000000" onChange={(e) => setphoneNumber(e.target.value)} value={phone_number} className="form-control" name="" id="" />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">

                    <button type="button" onClick={PhonenumberSubmit} class="btn btn-warning">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </>
          <>
            <div class="modal fade" id="workModal" tabindex="-1" role="dialog" aria-labelledby="workModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="workModalLabel">Occupation Edit </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form action="" method="post">
                      <div className="form-group">
                        <label htmlFor="">Occupation Edit </label>
                        <input type="text" placeholder="software engineer at serix" onChange={(e) => setWork(e.target.value)} value={work} className="form-control" name="" id="" />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">

                    <button type="button" onClick={workSubmit} class="btn btn-warning">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </>
          <>
            <div class="modal fade" id="educationModal" tabindex="-1" role="dialog" aria-labelledby="educationModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="educationModalLabel">Institution Edit </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form action="" method="post">
                      <div className="form-group">
                        <label htmlFor="">Institution Edit </label>
                        <input type="text" placeholder="Daystar University" onChange={(e) => setEducation(e.target.value)} value={education} className="form-control" name="" id="" />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">

                    <button type="button" onClick={educationSubmit} class="btn btn-warning">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </>
          <>
            <div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="emailModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="emailModalLabel">Email Address Edit</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form action="" method="post">
                    <div class="modal-body">

                      <div className="form-group">
                        <label htmlFor="">Email Address Edit</label>
                        <input type="text" onChange={(e) => setemail(e.target.value)}
                          value={email} className="form-control" name="" id="" />
                      </div>

                    </div>
                    <div class="modal-footer">

                      <button type="button" onClick={HandleSubmitEmail} class="btn btn-warning">Save changes</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </>
          <>
            <div class="modal fade" id="findinModal" tabindex="-1" role="dialog" aria-labelledby="findinModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <form action="" method="post">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="findinModalLabel">what are looking for ?</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">

                      <div className="form-group">
                        <label htmlFor="">What are looking for </label>
                        <br />
                        <div onChange={onChangeValue}>
                          <input type="radio" value="Male" name="find_in" checked={find_in === "Male"} /> Male
                          <input type="radio" value="Female" name="find_in" checked={find_in === "Female"} /> Female
                         
                        </div>
                      </div>

                    </div>
                    <div class="modal-footer">

                      <button type="button" onClick={FindInSubmit} class="btn btn-warning">Save changes</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
          <>
            <div class="modal fade" id="genderModal" tabindex="-1" role="dialog" aria-labelledby="genderModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="genderModalLabel">Gender Edit</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form action="" method="post">
                      <div className="form-group">
                        <label htmlFor="">Gender</label>
                        <br />

                        <div onChange={onChangeGender}>
                          <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> Male
                          <input type="radio" value="Female" name="gender" checked={gender === "Female"} /> Female
                         
                        </div>

                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" onClick={GenderSubmit} class="btn btn-warning">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>


      )}
    </>
  );
};



export default Settings;
// {user.map((items, id) => (
//   <>
// </>

// ))}
// <div className="accounts-data">
//             <div className="row">
//               <div className="col-sm-4">
//                 <div className="nav pt-5 ml-0 flex-column text-center">
//                   <li className="nav  text-center nav-item">
//                     <Link to="" className="active-item">Account Details </Link>
//                   </li>
//                   <li className="nav  text-center nav-item">
//                     <Link to="notifications" className="">Manage Notifications</Link>
//                   </li>

//                   <li className="nav  text-center nav-item">
//                   <Link to="/user/settings/deleteaccount" className="">Delete Account</Link>
//                   </li>
//                   <li className="nav  text-center nav-item">
//                     <div className="nav-link">
//                     <button  className="btn  btn-logout" onClickCapture={Logout}>logout user</button>

//                     </div>
//                   </li>
//                 </div>
//               </div>
//               <div className="col-sm-8 ml-0 col-md-8 col-lg-8 col-md-8">
//                 <div className="px-5 py-5">
//                   <form method="" onSubmit={HandleSubmit} action="" className="form mt-5">
//                     <div className="form-group">
//                       <label for="">Full Name</label>
//                       <input type="text" className="form-control" onChange={(e) => setfull_name(e.target.value)}  name="full_name">
//                     </div>
//                     <div className="form-group">
//                       <label for="">Prefered Name</label>
//                       <input type="text" className="form-control" onChange={(e) => setprefered_name(e.target.value)}  name="prefered_name">
//                     </div>
//                     {/* <div className="form-group">
//                       <label for="">Email Address</label>
//                       <input type="text" className="form-control" onChange={(e) => setemail(e.target.value)}  name="email">
//                     </div> */}

//                     <div className="form-group mt-5">
//                       <div className="d-flex justify-content-between">
//                         <button className="btn btn-color-grey" onClick={(e) => DisacardChanges(e)}>Discard Changes</button>
//                         <button className="btn btn-warning text-white  mr-5"  onClick={(e) => handleAddRow(e)}>Save Changes</button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
