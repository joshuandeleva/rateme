
import { Link } from "react-router-dom";
import MainSideBar from "../../SideBar/MainSideBar";
import SideBarHeader from "../../SideBar/Header";
import NoProfile from "../../assets/images/noAvatar.png"
import "../dashboard/index.css";
import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios"
import { BASE_API_URL } from "../../../utils/BaseUrl";
import ScaleLoader from "react-spinners/ScaleLoader";


const Profile = () => {
  const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
          }, 500)

    }, [])
  const [user, setUser] = useState([])
  const userId = JSON.parse(localStorage.getItem("userData"));
  const token = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(()=> {
    const GetUserDetails = async () => {
      const res = await axios
      .get(`${BASE_API_URL}/api/user/find/${userId.user._id}`, { headers: { "Authorization": `Bearer ${token}` } },
  )
      .then((res) => {
        
        const detailsData = res.data;
        console.log(detailsData);
        
        
        return setUser(res.data);
      });
    }
    GetUserDetails();
  },[])
  return (
    <>
    {loading ?
        // <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading Spinner" />
        <div className="d-flex justify-content-center loader">
            <ScaleLoader className='d-flex justify-content-center' color="#FFC247" speedMultiplier={4} />
        </div>
        :
    <div className="dashbaord">
      <div className="row g-0">
        <div className="sidebar-container">
            <MainSideBar />
        </div>
        <div className="banner-container">
        <SideBarHeader />
          <div className="accounts-data accounts-profile">
            <div className="row">
            <div className="col-sm-4">
                <div className="nav pt-4 ml-0 flex-column text-center">
                  <li className="nav  text-center nav-item">
                    <Link to="" className="active-item">
                      Profile Preview{" "}
                    </Link>{" "}
                  </li>

                  <li className="nav  text-center nav-item">
                    <Link to="/user/aboutme" className="">
                      About me
                    </Link>
                  </li>
                  <li className="nav  text-center nav-item">
                    <Link to="/user/education" className="">
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
              <div className="col-sm-8  col-md-8 col-lg-8 col-md-8">
                {user.map((item,id) => (
                   <div className="profiledata-user" key={id}>
                   <div className="ml-auto">
                     <div className="d-flex ">
                       <div className="profile-images mt-4">
                         <img src={item.image ? item.image : NoProfile} alt="" srcset="" />
                       </div>
                     </div>
                     <div className="user-details-data">
                         <div className="d-flex ">
                             <h3>{item.prefered_name}</h3>
                             <h3 className="mx-2">32</h3>
                         </div>
                         <div className="d-flex ">
                             <span className="">user</span>
                             <span className="mx-3">Lives in Nairobi</span>
                             <span className="mx-3">20Km Away</span>
                         </div>
                         <div className="d-flex ">
                             <span className="">user</span>
                             <span className="mx-3">Lives in Nairobi</span>
                         </div>
                         <div className="d-flex ">
                             <span className="">Phone Number</span>
                             <span className="mx-3">{item.phone_number}</span>
                         </div>
                         <div className="d-flex ">
                             <span className="">Gender</span>
                             <span className="mx-3">{item.gender}</span>
                         </div>
                         <div className="d-flex ">
                             <span className="">zodiacSign</span>
                             <span className="mx-3">{item.zodiacSign}</span>
                         </div>
                         <div className="user-paragraph mt-2">
                             <p>{item.bio}</p>
                         </div>
                         <div className="d-flex mt-2">
                          {/* {item.passions.map((m) => (
                            <button className="btn mx-2 btn-passions">{m}</button>

                          ))} */}
                             
                            
                         </div>
                     </div>
                   </div>
                 </div>

                ))}
               
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }



    </>
  );
};

export default Profile;
