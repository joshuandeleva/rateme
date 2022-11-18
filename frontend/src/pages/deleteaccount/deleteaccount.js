import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import "./deleteaccount";
import MainSideBar from "../SideBar/MainSideBar";
import SideBarHeader from "../SideBar/Header";
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import { axios } from "axios";
import { BASE_API_URL } from "../../utils/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const DeleteAccount = () => {

  let navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userData')).user._id
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const [deleteText, setdeleteText] = useState("");
 
  const [characterLimit] = useState(50);
  // event handler
  // const handleChange = event => {
  //   setdeleteText(event.target.value);
  // };
  const submitDelete = async(event) => {
    event.preventDefault()

    try {
      const res = await axios.delete(`${BASE_API_URL}/user/${userId}`,  {
        headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          return setdeleteText(res.data);
        });
     
        Swal.fire(
          "Awesome!",
          "You're successfully  added your bio details!",
          "success"
        ).then((res) => {
          if (res.isConfirmed || res.isDismissed) {
            navigate("/user/userprofile");
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


  }

  return (
    <div className="dashbaord">
      <div className="row g-0">
        <div className="sidebar-container">
          <MainSideBar />
        </div>
        <div className="banner-container">
          <SideBarHeader />
          <div className="banner-bar mx-5">
            <h3 className="settings">Settings</h3>
            <div className="row">
              <div className="col-sm-8">
                <Link
                  className=" settings-links "
                  to="/user/settings"
                >
                  Account details
                </Link>
                <Link
                  className="mx-3 settings-links"
                  to="/user/settings/notifications"
                >
                  Notification Settings
                </Link>
                <Link
                  className="mx-3 settings-links"
                  to="/user/settings/passwords"
                >
                  Passwords
                </Link>
                <Link
                  className="mx-3 settings-links active-tab"
                  to="/user/settings/deleteaccount"
                >
                  Delete Account
                </Link>
              </div>
            </div>
            <h3 className="mt-5 notification-title">Delete Account</h3>

            <div className="  emails-notifications">
              <p>
                Account deactivation means to delete your account,You will not
                be able to log in to your profile anymore and all your account
                history will be deleted without the possibility to restore
              </p>
              <hr />

              <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Tell us where you want delete the account</Form.Label>
                <Form.Control as="textarea" maxLength={50}   rows={3} value={deleteText} onChange={submitDelete} isInvalid={(deleteText.length < characterLimit)} />
                <div className="d-flex ml-auto">
                <Badge className='mt-3 badge-left' bg={`${deleteText.length < characterLimit ? 'danger' : 'primary'}`}>{deleteText.length}/{characterLimit}</Badge>

                </div>
              </Form.Group>
            </Form>
              <div className="d-flex justify-content-center">
                <div className="mt-4">
                 {deleteText.length >= characterLimit  ?  
                   <button
                   className="btn btn-warning text-white pl-5 pr-5"
                   type="submit"
                 >
                   Delete Account
                 </button>
                 :
                 <button onClick= {submitDelete}
                   className="btn btn-secondary text-white pl-5 pr-5"
                   type="submit"
                 >
                   Discard
                 </button>
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
