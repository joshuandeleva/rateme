import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import "./passions.css";
import SideBarHeader from "../SideBar/Header";
import MainSideBar from "../SideBar/MainSideBar";
import { BASE_API_URL } from "../../utils/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

import axios from "axios";

const Passions = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
  const [user, setUser] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("userData"));
  const userId = JSON.parse(localStorage.getItem("userData")).user._id;
  const token = JSON.parse(localStorage.getItem("accessToken"));
  let navigate = useNavigate();
  // const [usepassions, setpassions] = useState([]);
  const [userinfo, setUserInfo] = useState({
    passions: [],
    response: [],
  });
  const [buttonstate, setButtonState] = useState(false)
  const [checkboxstate, setcheckboxSate] = useState([''])
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { passions } = userinfo;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setButtonState(true)
      setUserInfo({
        passions: [...passions, value],
        response: [...passions, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        passions: passions.filter((e) => e !== value),
        response: passions.filter((e) => e !== value),
      });
    }
  };


  useEffect(() => {
    const getUserPictures = async () => {
      const res = await axios
        .get(`${BASE_API_URL}/api/user/find/${userdata.user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const detailsData = res.data;
          // console.log(detailsData);
          return setUser(res.data);
        });
    };
    getUserPictures();
  }, []);

  const submitPassions = async (e) => {
    e.preventDefault();
    const updatepassions = userinfo.response

    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          passions:updatepassions,
        })

        .then((res) => {
          setUserInfo(...userinfo.response, res.data);
          // console.log(res.data);
        });
      Swal.fire(
        "Awesome!",
        "You're successfully  added your passion details!",
        "success"
      ).then((res) => {
        if (res.isConfirmed || res.isDismissed) {
          navigate("/user/passions");
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
    console.log()

  };
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
              <div className="profile-data">
                <div className="topbar-banner"></div>
                {user.map((item, id) => (
                  <div className="profile-details-data" key={id}>
                    <div className="profile-image-banner">
                      <img src={item.image} alt="" />
                      <div className="edit-button">
                        <button className="btn">Edit profile</button>
                      </div>
                    </div>
                    <div className="container">
                      <div className="profile-text-data mt-5 pt-3 mx-5">
                        <h4>{item.prefered_name}</h4>
                        <h6>{item.gender}</h6>
                        <h6>{item.zodiacSign}</h6>


                        <div className="d-flex pt-3">
                          <li className="links-tabs ">
                            <Link to="/user/userprofile" className="links">
                              Use Bio
                            </Link>
                          </li>
                          <li className="links-tabs mx-4 ">
                            <Link to="/user/aboutme" className="links">
                              About me
                            </Link>
                          </li>
                          <li className="links-tabs mx-4">
                            <Link to="/user/passions" className="links active">
                              Passions
                            </Link>
                          </li>
                        </div>
                        <hr />
                      </div>
                      <div className="row">
                        <div className="col-sm-9 mx-5">
                          <div className="passions-component">
                          <input type="checkbox" name="passions" value="Travelling" onChange={handleChange} id="" />
                         {buttonstate === true ? 
                          <button className="btn border mx-2 mt-1 btn-passion">Travelling</button>
                          :
                          <button className="btn border mx-2 mt-1 btn-warning">Travelling</button>
                         }
                            
                          </div>
                          <input type="checkbox" name="passions" value="Travelling" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Travelling</button>
                          <input type="checkbox" name="passions" value="Music" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Music</button>
                          <input type="checkbox" name="passions" value="Movies" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Movies</button>
                          <input type="checkbox" name="passions" value="Skating" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Skating</button>
                          <input type="checkbox" name="passions" value="Art" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Art</button>
                          <input type="checkbox" name="passions" value="Cinema" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Cinema</button>
                          <input type="checkbox" name="passions" value="Netflix" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Netflix</button>
                          <input type="checkbox" name="passions" value="Games" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Games</button>
                          <input type="checkbox" name="passions" value="Camping" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Camping</button>
                          <input type="checkbox" name="passions" value="Hiking" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Hiking</button>
                          <input type="checkbox" name="passions" value="Disney" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Disney</button>
                          <input type="checkbox" name="passions" value="Hockey" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Hockey</button>
                          <input type="checkbox" name="passions" value="Netflix" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Netflix</button>
                          <input type="checkbox" name="passions" value="F1" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">F1</button>
                          <input type="checkbox" name="passions" value="Trivia" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Trivia</button>
                          <input type="checkbox" name="passions" value="Twitch" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Twitch</button>
                          <input type="checkbox" name="passions" value="Coding" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Coding</button>
                          <input type="checkbox" name="passions" value="Boxing" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Boxing</button>
                          <input type="checkbox" name="passions" value="GYM" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">GYM</button>
                          <input type="checkbox" name="passions" value="Monopoly" onChange={handleChange} id="" />
                          <button className="btn border mx-2 mt-1 btn-passion">Monopoly</button>

                          <div className="form-floating mt-3 mb-3 text-center">
                           
                            <textarea
                              className="form-control text"
                              name="response"
                              value={userinfo.response}
                              placeholder="The checkbox values will be displayed here "
                              id="floatingTextarea2"
                              style={{ height: "150px" }}
                              onChange={(e) => handleChange(e.target.value)}
                            ></textarea>
                          </div>
                          <button type="submit" onClick={submitPassions} className="btn btn-warning text-white">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Passions;
