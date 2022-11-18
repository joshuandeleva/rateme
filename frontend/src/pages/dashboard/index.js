import React, { useState, useEffect } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import CardUser from "./cardUser";
import { AiOutlineHeart } from "react-icons/ai";
import { BASE_API_URL } from "../../utils/BaseUrl";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

import "./index.css";
import MainSideBar from "../SideBar/MainSideBar";
import SideBarHeader from "../SideBar/Header";
import Discoverdata from "../Discoveruserdata/Discoverdata";
import { calculatebirthday } from '../../helpfunctions/helpfunction'

const Dashboard = () => {
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)

  }, [])
  const [usersData, setUsersData] = useState([]);
  const [detailData, setDetails] = useState()

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    const token = JSON.parse(localStorage.getItem("accessToken"))

    const getUsersdata = async () => {
      try {
        const res = await axios
          .get(`${BASE_API_URL}/api/user/all`, { headers: { "Authorization": `Bearer ${token}` } },

          ).then((res) => {
            const detailsData = res.data
            setDetails(detailData)
            console.log(detailsData, 'heyyyyyy');
            return setUsersData(res.data);
          })
      } catch (error) {
        console.log(error);
      }
    }
    getUsersdata();

  }

  const userZodiacsign = JSON.parse(localStorage.getItem('userData')).user.zodiacSign
  const userLoggedId = JSON.parse(localStorage.getItem('userData')).user._id
  const Date_of_birth = JSON.parse(localStorage.getItem("userData")).user.D_O_B
  calculatebirthday(Date_of_birth)

  return (
    <>
      {loading ?
        <div className="d-flex justify-content-center loader">
          <ScaleLoader className='d-flex justify-content-center' color="#FFC247" speedMultiplier={4} />
        </div>
        :
        <div className="dashboard">
          <div className="sidebar-container">
            <MainSideBar />
          </div>
          <div className="banner-container">
            <SideBarHeader />
            <div className="container ">
              <div className="discovermore mt-3">
                <h5>My stars </h5>
                <div className="row">
                  {usersData.filter((item) => item.zodiacSign === userZodiacsign && item._id !== userLoggedId).map((item, id) => {
                    console.log(item, 'item done')
                    return (
                      <div className="col-sm-3" key={id} >
                        <div className="container-star-item">
                          <CardUser
                            LikeIcon={AiOutlineHeart}
                            MessageIcon={BiMessageSquareDetail}
                            Name={item.prefered_name}
                            // Image={userData.image}
                            Image={item.image}
                            distance={item.zodiacSign}
                            Age={

                              calculatebirthday(item.D_O_B)
                            }
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="title">
                <h4 className="title mt-3">Discover More people</h4>
              </div>
              <div className="row ">
                <Discoverdata />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default Dashboard;
