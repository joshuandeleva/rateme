import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home/index"
import Contact from "./pages/contact/index"
import Download from "./pages/download/index"
import Safety from "./pages/safety/index"
import MainAuth from './pages/auth/mainAuth';
import StepOne from './pages/user/stepOne';
import StepTwo from './pages/user/stepTwo';
import StepThree from './pages/user/stepThree';
import StepFour from './pages/user/stepFour';
import StepFive from './pages/user/stepFive';
import Login from './pages/auth/login';
import Dashboard from './pages/dashboard/index';
import Settings from './pages/settings/index';
import Notifications from './pages/notifications/notifications';
import Forgotpassword from './pages/forgotpassword/forgotpassword';
import DeleteAccount from './pages/deleteaccount/deleteaccount';
import Discover from './pages/discover/discover'
// import Profile from './pages/profile/index'
import Aboutme from './pages/aboutme/aboutme'
// import Education from './pages/education/education'
import Message from "./pages/message/index"
import Passion from './pages/passions/passions'
import Discoverbad from './pages/Discoveruserdata/Discoverdata'
import Changepassword from './pages/changepassword/changepassword';
import UserProfile from './pages/aboutprofile/aboutprofile';
import Updatepassword from './pages/updatepassword/updatepassword';
import Notificationplus from './pages/notificationplus/notificationplus';


function App() {
  const [userData, setUserData] = useState({})
  const [user, setUser] = useState(null);

  const updateUserdata = (data) => {
    setUserData((prevUser) => ({ ...prevUser, ...data }))
  }
  const resetUser = () => {
    setUserData({});
  };
  useEffect(() => {
    const isLogged = localStorage.getItem("userData")
    if (isLogged) {
      const foundUser = JSON.parse(isLogged)
      setUser(foundUser?.user)
    }
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path="/downloads" element={<Download />} />
          <Route exact path="/safety" element={<Safety />} />
          <Route exact path="/user/login" element={<Login />} />
          <Route exact path="/user/forgetpassword" element={<Forgotpassword />} />
          <Route exact path="/user/changepassword" element={<Changepassword />} />
          <Route exact path="/user/accountsetup" element={<MainAuth />} />
          <Route exact path="/user/stepOne" element={<StepOne updateUserdata={updateUserdata} userData={userData} />} />
          <Route exact path="/user/stepTwo" element={<StepTwo updateUserdata={updateUserdata} userData={userData} />} />
          <Route exact path="/user/stepthree" element={<StepThree updateUserdata={updateUserdata} userData={userData} />} />
          <Route exact path="/user/stepFour" element={<StepFour updateUserdata={updateUserdata} userData={userData} />} />
          <Route exact path="/user/stepFive" element={<StepFive updateUserdata={updateUserdata} userData={userData} resetUser={resetUser} />} />
          <Route exact path="/user/dashboard" element={user ? <Dashboard /> : <Navigate to="/user/login" />} />
          <Route exact path="/user/settings" element={<Settings />} />
          <Route exact path="/user/messages" element={<Message />} />
          <Route exact path="/user/settings/notifications" element={<Notifications />} />
          <Route exact path="/user/notificationsplus" element={<Notificationplus />} />
          <Route exact path="/user/settings/deleteaccount" element={<DeleteAccount />} />
          <Route exact path="/user/settings/passwords" element={<Updatepassword />} />
          <Route exact path="/user/discover" element={<Discover />} />
          {/* <Route exact path="/user/profile" element={<Profile />} /> */}
          <Route exact path="/user/aboutme" element={<Aboutme />} />
          {/* <Route exact path="/user/education" element={<Education />} /> */}
          <Route exact path="/user/passions" element={<Passion />} />
          <Route exact path="/user/discoverdata" element={<Discoverbad />} />
          <Route exact path="/user/userprofile" element={<UserProfile />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
