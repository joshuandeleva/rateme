import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import CardUser from "./cardUser";
import { AiOutlineHeart } from "react-icons/ai";
import trial from "../../assets/images/trial.png";
import { useState, useEffect } from "react";
import "./index.css";
import MainSideBar from "../SideBar/MainSideBar";
import SideBarHeader from "../SideBar/Header";
import { BASE_API_URL } from "../../utils/BaseUrl";
import axios from "axios";

import Discoverdata from "../Discoveruserdata/Discoverdata";
import { calculatebirthday } from "../../helpfunctions/helpfunction";
const Dashboard = () => {
  const [userStars, SetUserStars] = useState([]);
  const [activeUser, setActiveUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)


  useEffect(() => {
    getStars();
  }, []);


  //get users
  const getStars = () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const getUserStarsDetails = async () => {
      const res = await axios
        .get(`${BASE_API_URL}/api/user/all/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const detailsData = res.data;
          console.log(detailsData);
          return SetUserStars(res.data);
        });
    };
    getUserStarsDetails();
  };
  const userZodiacsign = JSON.parse(localStorage.getItem('userData')).user.zodiacSign
  const userLoggedId = JSON.parse(localStorage.getItem('userData')).user._id

  return (
    <div className="dashboard">
      <div className="sidebar-container">
        <MainSideBar />
      </div>
      <div className="banner-container">
        <SideBarHeader />
        <div className="container ">
          <div className="title">
            <h4 className="title"> My Stars </h4>
          </div>
          <div className="row ">
            {userStars.filter((item) => item.zodiacSign === userZodiacsign && item._id !== userLoggedId).map((item, id) => (
              <div className="col-sm-3">
                <div className="container-star-item">
                  <CardUser
                    LikeIcon={AiOutlineHeart}
                    MessageIcon={BiMessageSquareDetail}
                    Name={item.prefered_name}
                    Image={item.image}
                    Sign={item.zodiacSign}
                    distance={2}
                    Age={calculatebirthday(item.D_O_B)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="discovermore mt-3">
            <h5> Discover more people </h5>
            <Discoverdata />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
