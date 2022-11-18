import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/Logods.png";
import { Link } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import axios from "axios";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { BiBellPlus, BiMessageSquareDetail } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { BASE_API_URL } from "../../utils/BaseUrl";
import SidebarOption from "../dashboard/sideBarOPtion";
import NoProfile from "../../assets/images/noAvatar.png"
import { useNavigate } from "react-router-dom";
import './mainsidebar.css'

const MainSideBar = () => {
    let navigate = useNavigate();

    const [userDetails, setUserDetails] = useState();
    useEffect(() => {
        //get id
        getUser();
    }, []);
    //get user details
    const getUser = () => {
        const userId = JSON.parse(localStorage.getItem("userData"));
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const getUserDetails = async () => {
            const res = await axios
                .get(`${BASE_API_URL}/api/user/find/${userId.user._id}`, { headers: { "Authorization": `Bearer ${token}` } },
                )
                .then((res) => {
                    let resp = res.data;
                    resp = resp.map(res => {
                        const D_O_B = res
                        return D_O_B

                    })
                    return setUserDetails(res.data);
                })
                .catch((err) => console.log(err));
        };
        getUserDetails();
    };
    //logout user
    const handleLogout = () => {
        setUserDetails({});
        localStorage.clear();
    }
    const profileRedirect = () => {
        navigate("/user/userprofile");
    }
    return (
        <div>
            <div className="side-panel">
                <div className="side-panel-header-logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="profile-details-bar">
                    {userDetails && userDetails.map((userDetail, id) => (
                        <div className="side-panel-header" key={id}>
                            <div className="side-panel-account-details">
                                <div className="pb-3 side-panel-account-details-avatar">
                                    {/* <img src={userDetail.image} alt="" /> */}
                                    <img onClick={profileRedirect} src={userDetail.image ? userDetail.image : NoProfile} alt="" srcset="" />
                                    <div className="d-block">
                                        <div className="profile-name">
                                            <h4>{userDetail.prefered_name} </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="side-panel-menu">
                    <Link className="settings " to='/user/dashboard'>
                        <SidebarOption active Icon={BsStar} title="My Stars" />
                    </Link>
                    <Link className="settings " to='/user/discover'>
                        <SidebarOption Icon={RiCompassDiscoverLine} title="Discover" />
                    </Link>
                    <Link className="settings " to='/user/messages'>
                        <SidebarOption Icon={BiMessageSquareDetail} title="Messages" />
                    </Link>
                    <Link className="settings " to="/user/notificationsplus">
                        <SidebarOption className="" Icon={BiBellPlus} title="Notifications" />
                    </Link>
                    <Link className="settings " to='/user/settings'>
                        <SidebarOption className="" Icon={FiSettings} title="Settings" />
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default MainSideBar