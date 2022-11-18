import React, { useEffect, useRef, useState } from "react";
import "../dashboard/index.css";
import { IoIosSend } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai"
import { BsFillCameraVideoFill } from "react-icons/bs"
import { FiMoreVertical } from "react-icons/fi"
import { BiSearch } from "react-icons/bi"
import MainSideBar from "../SideBar/MainSideBar";
import SideBarHeader from "../SideBar/Header";
import ConversationCard from "./conversationCard";
import ChatMessage from "./chatMessage";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { io } from "socket.io-client";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BASE_API_URL } from "../../utils/BaseUrl";

const MessagePage = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
    console.log("replicating");
  }, []);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef(io("ws://localhost:8900"));

  const loggedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
  console.log("ksdfnsd ksdfksdfnn");
  const loggedUserId = loggedUserData?.user;
  const currentLoggedUser = JSON.parse(localStorage.getItem("userData")).user;

  const scrollRef = useRef();

  ///here is where that replication is happening
  //C
  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });

  //   });
  //   return () => socket.current.close();
  // }, [arrivalMessage]);

  //track messages received

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", loggedUserId._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [loggedUserId]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        // const { data } = await userChats(loggedUserId._id);
        const res = await axios.get(
          `${BASE_API_URL}/api/conversation/${currentLoggedUser._id}`
        );
        setConversations(res.data);
        //not replicating
        console.log(res.data, "chats done");
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, []);

  //get messages

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/message/" + currentChat?._id
        );
        console.log(res, "here we go");
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  //handle submit of message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: loggedUserId._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== loggedUserId._id
    );
    socket.current.emit("sendMessage", {
      senderId: loggedUserId._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/message/",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  //socket message

  //scroll on message

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center loader">
          <ScaleLoader
            className="d-flex justify-content-center"
            color="#FFC247"
            speedMultiplier={4}
          />
        </div>
      ) : (
        <div className="dashboard">
          <div className="sidebar-container">
            <MainSideBar />
          </div>
          <div className="banner-container">
            <SideBarHeader />
            <div className="message-body">
              <div className="row">
                <div className="col-sm-5 col-lg-5">
                  <div className="message-body__showChats">
                    <div className="">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bolder mb-0 pb-3">Messages</p>
                        <AiFillEdit className="message-icon-edit" />
                      </div>
                      <div className="search-message-user position-relative pb-1">
                        <input type="text" placeholder="Search" className="rounded border-0 px-3 py-1 w-100" style={{ backgroundColor: "#dcdde1" }} />
                        <BiSearch className="message-search-icon" />
                      </div>
                    </div>
                    <div className="show-all-conversations ms-2">
                      {conversations.map((c) => (
                        <div
                          key={c._id}
                          onClick={() => setCurrentChat(c)}
                          className="show-all-conversations-card"
                        >
                          <ConversationCard
                            conversation={c}
                            currentUser={currentLoggedUser._id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-sm-7 col-lg-7 ChatWrapper">
                  {currentChat ? (
                    <div className="">
                      <div className="mainCahtHeader">
                        <div className="chat-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="chat-header-img d-flex align-items-center text-center">
                              <img src={loggedUserId?.image} alt="" />
                            </div>
                            <div className="ms-5" style={{ display: "flex", flex: "1" }}>
                              <p>{loggedUserId?.full_name}</p>
                            </div>
                            <div>
                              <BsFillCameraVideoFill />
                              <FiMoreVertical />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chatBoxTop">
                        <div className="chatMessages-all" ref={scrollRef}>
                          {messages.map((m) => (
                            <ChatMessage
                              key={m._id}
                              message={m}
                              currentprofile={m}
                              own={m.sender === loggedUserId._id}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="form-wrapper-bottom">
                        <div className="chatBoxBottom d-flex">
                          <InputEmoji
                            className=""
                            placeholder="say something"
                            onChange={setNewMessage}
                            value={newMessage}
                          />
                          <button
                            className="rounded px-5 btn-home"
                            onClick={handleSubmit}
                          >
                            <IoIosSend />
                          </button>
                        </div>
                      </div>
                      <div />
                    </div>
                  ) : (
                    <span className="">
                      open a conversation to start a chat
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MessagePage;
