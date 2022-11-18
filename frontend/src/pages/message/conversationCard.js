import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMyUser } from "../../utils/apirequests/userRequest";
import { BASE_API_URL } from "../../utils/BaseUrl";
import "./conversationCard.css";
export default function ConversationCard({ conversation, currentUser }) {
    const [currentLoggedUser, setcurrentLoggedUser] = useState(null);
    useEffect(() => {
        //find user id who is not equal to the current logged user id
        const friendId = conversation.members.find(
            (member) => member !== currentUser._id
        );
        //get loggedUser user
        const getUserData = async () => {
            try {
                const { data } = await getMyUser(friendId)
                // const res = await axios(`${BASE_API_URL}/api/users?userId=`+friendId)
                setcurrentLoggedUser(data)
                console.log(data, 'our users')
            } catch (error) {
                console.log(error)
            }
        }
        getUserData();

    }, [currentUser, conversation]);
    //if no user found
    if (!currentLoggedUser) {
        return null;
    }
    return (
        <div className="conversationCard">
            <div className="main-ccard-conversation">
                <div className="conversationCard--profile d-flex">
                    <div className="conversationCard--profileIgm">
                        <img src={currentLoggedUser?.image} className="" alt="" />
                    </div>
                    <div className="conversationCard--profileDetails d-flex text-center align-items-center ps-3">
                        <p className="profileDetails--name">{currentLoggedUser?.prefered_name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
//key