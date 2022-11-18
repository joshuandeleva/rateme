import "./aboutprofile.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import SideBarHeader from "../SideBar/Header";
import MainSideBar from "../SideBar/MainSideBar";
import trialimage from "../../assets/images/trial.png";
import { BASE_API_URL } from "../../utils/BaseUrl";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaPinterestP,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  const [user, setUser] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("userData"));
  const token = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios
        .get(`${BASE_API_URL}/api/user/find/${userdata.user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Userprofile data", res.data);
          return setUser(res.data);
        });
    };
    getUserDetails();
  }, []);
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
                            <Link
                              to="/user/userprofile"
                              className="links active"
                            >
                              Use Bio
                            </Link>
                          </li>
                          <li className="links-tabs mx-4 ">
                            <Link to="/user/aboutme" className="links">
                              About me
                            </Link>
                          </li>
                          <li className="links-tabs mx-4">
                            <Link to="/user/passions" className="links">
                              Passions
                            </Link>
                          </li>
                        </div>
                        <hr />
                        <div className="row g-0 bio-data pt-2">
                          <div className="col-sm-8">
                            <h3>Short Bio</h3>
                            <div className="bio">
                              <p>
                                {item.bio ? item.bio : "Write your Bio here"}
                              </p>
                            </div>
                            <h3>Passions</h3>
                            <div className="row ">
                              <div className="col-sm-12">
                              {item.passions.map((m) => (
                                <button className="btn mt-1 btn-passions mx-2">
                                  {m ? m : "No passions"}
                                </button>
                              ))}
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4 mx-5 pl-5">
                            <div className="place d-flex">
                              <FontAwesomeIcon icon={faMapMarkerAlt} />
                              <span className="mx-3">Onganta Rongai</span>
                            </div>
                            <div className="d-flex mt-5 social-icons">
                              <Link to="/">
                                <FaTwitter className="mx-3 twitter-icon" />
                              </Link>
                              <Link to="/">
                                <FaLinkedinIn className="mx-3 linkedln-icon" />
                              </Link>
                              <Link to="/">
                                <FaInstagram className="mx-3 instagram-icon" />
                              </Link>
                              <Link to="/">
                                <FaFacebookF className="mx-3 facebook-icon" />
                              </Link>

                              <Link to="/">
                                <FaPinterestP className="mx-3 pinterest-icon" />
                              </Link>
                            </div>
                          </div>
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

export default UserProfile;
