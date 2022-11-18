import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../dashboard/index.css";
import "./education.css";
import SideBarHeader from "../SideBar/Header";
import MainSideBar from "../SideBar/MainSideBar";
import axios from "axios";
import { BASE_API_URL } from "../../utils/BaseUrl";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Aboutme = () => {
  const [user, setUser] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("userData"));
  const userId = JSON.parse(localStorage.getItem("userData")).user._id;
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [school, setSchool] = useState();
  const [work, setWork] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    const getUserPictures = async () => {
      const res = await axios
        .get(`${BASE_API_URL}/api/user/find/${userdata.user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const detailsData = res.data;
          console.log("details", detailsData);
          return setUser(res.data);
        });
    };
    getUserPictures();
  }, []);
  // const institution = JSON.parse(localStorage.getItem("userData")).user.school;
  // const work = JSON.parse(localStorage.getItem("userData")).user.work;

  const handleSchoolSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          school,
        })

        .then((res) => {
          setSchool(...school, res.data);
          // console.log(res.data);
        });
        Swal.fire('Awesome!', "You're successfully added your institution details!", 'success').then(
          (res) => {
              if (res.isConfirmed || res.isDismissed) {
                navigate('/user/profile')
                 
                  
              }
          }
      );
  } catch (error) {
      console.log(error)
      if (error.response) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data
          });
          console.log('error', error.response.data);
      }
  }
  };

  const handleWorkSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          work,
        })

        .then((res) => {
          setWork(...work, res.data);
          // console.log(res.data);
        });
        Swal.fire('Awesome!', "You're successfully  added your occupation details!", 'success').then(
          (res) => {
              if (res.isConfirmed || res.isDismissed) {
                navigate('/user/profile')
                 
                  
              }
          }
      );
  } catch (error) {
      console.log(error)
      if (error.response) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data
          });
          console.log('error', error.response.data);
      }
  }
  };

  return (
    <div className="dashbaord">
      <div className="row g-0">
        <div className="sidebar-container">
          <MainSideBar />
        </div>
        <div className="banner-container">
          <SideBarHeader />
          <div className=" accounts-data accounts-data-profile">
            <div className="row">
              <div className="col-sm-4">
                <div className="nav pt-2 ml-0 flex-column text-center">
                  <li className="nav  text-center nav-item border-none">
                    <Link to="/user/profile" className="">
                      Profile Preview
                    </Link>
                  </li>
                  <hr />

                  <li className="nav  text-center nav-item">
                    <Link to="/user/aboutme" className="">
                      About me
                    </Link>
                  </li>
                  <li className="nav  text-center nav-item">
                    <Link to="/user/education" className="active-item">
                      Work and Education
                    </Link>
                  </li>
                  <li className="nav  text-center nav-item">
                    <Link to="/user/passions" className="">
                      Passions
                    </Link>
                  </li>
                </div>
              </div>
              <div className="col-sm-8 m-0 ml-0 col-md-8 col-lg-8 col-md-8 ">
                <div className="mt-5">
                  <div>
                    <h5 class="text-center">Education</h5>
                    {user.map((item, id) => (
                      <div className="border-uni p-2" key={id}>
                        <span>
                          {item.school ? item.school : "Add institution"}
                        </span>
                      </div>
                    ))}

                    <form
                      onSubmit={handleSchoolSubmit}
                      action=""
                      className="mt-3"
                    >
                      <label htmlFor="" className="mt-2">
                        School
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => setSchool(e.target.value)}
                        value={school}
                        className="form-control"
                      />

                      <div className="d-flex justify-content-center">
                        <button className="btn btn-warning mt-3 text-white">
                          Add
                        </button>
                      </div>
                    </form>
                  </div>

                  <h5 class=" mt-3">Work</h5>
                  
                  {user.map((item, id) => (
                    <div className="border-uni p-2" key={id}>
                    <span>{item.work ? item.work : "Add work"}</span>
                  </div>
                  ))}

                  <form action="" onSubmit={ handleWorkSubmit} className="mt-3" method="post">
                    <label htmlFor="" className="mt-2">
                      Occupation
                    </label>
                    <input type="text" name="" id="" className="form-control"  onChange={(e) => setWork(e.target.value)}
                        value={work} />

                    <div className="d-flex justify-content-center">
                      <button className="btn btn-warning mt-3 text-white">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
