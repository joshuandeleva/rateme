import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiMessageSquareDetail } from "react-icons/bi";
import CardUser from "../dashboard/cardUser";
import { BASE_API_URL } from "../../utils/BaseUrl";
import { AiOutlineHeart } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Discoverdata = () => {
  let navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));

    const getUsersdata = async () => {
      try {
        const res = await axios
          .get(`${BASE_API_URL}/api/user/all/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const detailsData = res.data;
            console.log(detailsData, "we are up");
            return setUsersData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUsersdata();
  };
  const getCurrent = JSON.parse(localStorage.getItem("userData")).user._id;
  const loggedUserID = JSON.parse(localStorage.getItem("userData")).user._id;
  const handleInitiateConversation = ({ _id }) => {
    const res = axios.post(`${BASE_API_URL}/api/conversation/`, { senderId: `${_id}`, receiverId: `${loggedUserID}` })
      .then(data => { console.log("We have created a conversation", data) })
      .catch(error => console.log("error", error.message))

  };
  return (
    <div className="row ">
      {usersData
        .slice(0, 4)
        .filter((user) => user._id !== getCurrent)
        .map((item) => {
          return (
            <div className="col-sm-3">
              <div className="container-star-item">
                <CardUser
                  handleInitiateConversation={handleInitiateConversation}
                  LikeIcon={AiOutlineHeart}
                  MessageIcon={BiMessageSquareDetail}
                  Name={item.prefered_name}
                  Image={item.image}
                  distance={2}
                  Sign={item.zodiacSign}
                  Age={20}
                  item={item}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Discoverdata;
