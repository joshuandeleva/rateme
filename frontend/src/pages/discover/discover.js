import React, { useState, useEffect } from "react";
import trialImage from "../../assets/images/trial3.png";
import "../dashboard/index.css";
import "./discover.css";
import MainSideBar from "../SideBar/MainSideBar";
import { getAllusers } from '../../utils/apirequests/userRequest'
import SideBarHeader from "../SideBar/Header";
import TinderCards from "./tinderCard";;
const Discover = () => {
  const [users, setUsers] = useState([])
  const [matches, setMatches] = useState(null)


  useEffect(() => {
    const getUserFromDB = async () => {
      try {
        const { data } = await getAllusers()
        setUsers(data)
        console.log('All users from discover page', data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserFromDB()
  }, [])

  //check if their issa a match
  const userZodiacsign = JSON.parse(localStorage.getItem('userData')).user.zodiacSign
  const userLoggedId = JSON.parse(localStorage.getItem('userData')).user._id

  //Fire = Fire ,Air  ; Earth = Earth ,Water ; Air = Air ,Fire ; Water = Water ,Earth;
  const compatiableSigns = {
    Fire: ['fire', 'Arias', 'Leo', 'Sagittarius'],
    Earth: ['Taurus', 'virgo', 'Capricon'],
    Air: ['Gemini', 'Libra', 'Aquarius'],
    Water: ['Cancer', 'Scorpio', 'Pisces']
  }






  return (
    <div className="dashboard">
      <div className="sidebar-container">
        <MainSideBar />
      </div>
      <div className="banner-container">
        <SideBarHeader />
        <div className="row">
          <div className="col-sm-4 discover-col-lg-4 pt-2">
            <h4 className="text-center">Matches</h4>
            <hr />
            {users.filter((item) => item.zodiacSign === userZodiacsign && item._id !== userLoggedId).map((item, id) => {
              return (
                <div className="likes-items">
                  <div className="d-flex">
                    <div className="profile-pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="profile-details">
                      <div className="d-flex ">
                        <div className="d-block">
                          <span className="user-name">{item.prefered_name}</span>
                        </div>
                        <div className="d-block ml-auto">
                          <span className="ml-auto">{item.zodiacSign}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>)
            }
            )}
          </div>
          <div className="col-sm-8 col-lg-8">
            <TinderCards />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Discover;
