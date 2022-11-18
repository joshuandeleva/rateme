import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link } from "react-router-dom";
import "../dashboard/index.css";
import "./notifications.css";
import ToggleSwitch from "./togglecheckbox";
import MainSideBar from "../SideBar/MainSideBar";
import SideBarHeader from "../SideBar/Header";

const Notifications = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);
  return (
    <>
      {/* {loading ? (
        // <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading Spinner" />
        <div className="d-flex justify-content-center loader">
          <ScaleLoader
            className="d-flex justify-content-center"
            color="#FFC247"
            speedMultiplier={4}
          />
        </div>
      ) : ( */}
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
                      className="mx-3 settings-links active-tab"
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
                      className="mx-3 settings-links"
                      to="/user/settings/deleteaccount"
                    >
                      Delete Account
                    </Link>
                  </div>
                </div>

                <h3 className="mt-5 notification-title">Notification settings</h3>
                <span>What Notifications do you want to recieve</span>
<hr />
                <div className="  emails-notifications">
                  <div className="d-block mt-4">
                    <React.Fragment>
                      <ToggleSwitch label="Email Info Messages" />
                      <ToggleSwitch label="New Likes" />
                      <ToggleSwitch label="New Message" />
                    </React.Fragment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default Notifications;
