import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import trial2 from "../../assets/images/trial2.png";
import "./aboutme.css";
import SideBarHeader from "../SideBar/Header";
import MainSideBar from "../SideBar/MainSideBar";
import { BASE_API_URL } from "../../utils/BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'


import axios from "axios";

const Aboutme = () => {
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

  const [bio, setNewBioMessage] = useState('');
  const [characterLimit] = useState(140);

  let navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios
        //http://localhost:5000/api/user/63051cc46cd80438d47c0949
        .put(`${BASE_API_URL}/api/user/update/${userId}`, {
          bio,
        })

        .then((res) => {
          setNewBioMessage(...bio, res.data);
          // console.log(res.data);
        });
        toast.success('Bio details added  successfully !', {
          position: toast.POSITION.TOP_RIGHT
      });
    
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
                           <Link to="/user/aboutme" className="links active">
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
                      </div>
                      <div className="row">
                       <div className="col-sm-8 mx-5">
                       <Form onSubmit={handleSubmit}
                          action=""
                          className="d-flex flex-column">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Badge className='mt-3' bg={`${bio.length > characterLimit ? 'danger' : 'primary'}`}>{bio.length}/{characterLimit}</Badge>
                <Form.Control as="textarea" maxLength={150}   rows={3} value={bio}  onChange={(e) => setNewBioMessage(e.target.value)} isInvalid={(bio.length > characterLimit)} />
              </Form.Group>
              <div className="d-flex justify-content-center">
                            <button className="btn btn-warning text-white mt-2">
                              Submit
                            </button>
                          </div>
            </Form>
            <ToastContainer />
                       {/* <form
                          onSubmit={handleSubmit}
                          action=""
                          className="d-flex flex-column"
                        >
                          <label htmlFor="">Bio</label>
                          <span>Let others know more about you.</span>


                          <textarea
                            id=""
                            cols="20"
                            className="form-control mt-2"
                            rows="3"
                            onChange={(e) => setNewBioMessage(e.target.value)}
                            value={bio}
                          ></textarea>
                          <div className="d-flex justify-content-center">
                            <button className="btn btn-warning text-white mt-2">
                              Submit
                            </button>
                          </div>
                        </form> */}
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

export default Aboutme;
