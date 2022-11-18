import React, { useEffect, useState } from 'react'
import { BASE_API_URL } from '../../utils/BaseUrl'
import { getAllusers } from '../../utils/apirequests/userRequest'
import axios from 'axios'
import './cardUser.css'

const CardUser = ({ Image, Name, LikeIcon, MessageIcon, distance, handleInitiateConversation, item, Age }) => {
    const [userStars, SetUserStars] = useState([]);
    const [currentuser, setCurrentUser] = useState('')
    const [activeUser, setActiveUser] = useState('')
    const userData = JSON.parse(localStorage.getItem("usersData"))
    const userId = JSON.parse(localStorage.getItem("userData"));
    const token = JSON.parse(localStorage.getItem("accessToken"));


    const showAllUsers = async () => {
        try {
            const { data } = await getAllusers()
            SetUserStars(data)
            console.log(data, 'users here')
        } catch (error) {
            console.log(error)
        }
    }
    //get all users 
    useEffect(() => {
        const showAllUsers = async () => {
            try {
                const { data } = await getAllusers()
                setActiveUser(data)
                console.log(data, 'All users available')
            } catch (error) {
                console.log(error)
            }
        }
        showAllUsers()
    }, [])
    useEffect(() => {
        // 

    }, [])

    console.log('TESTING handleInitiateConversation', item)

    //currently logged
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios(`${BASE_API_URL}/api/user/${userId}`, { headers: { "Authorization": `Bearer ${token}` } },)
                console.log(res.data, 'current user')
                setCurrentUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (!currentuser) {
            getCurrentUser()
        }
    }, [token, userId, currentuser])


    //send message

    return (
        <div className='userCard' style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}>
            <div className="userCardTop__Icon">
                <LikeIcon className="cardIcon1" />
                <MessageIcon onClick={() => handleInitiateConversation(item)} className="cardIcon" />
            </div>
            <div className="userCardFooter">
                <div className="userCard__details">
                    <div className="userdetail1">
                        <h4>{Name}</h4>

                        {/* <h5>{item.createdAt} yrs</h5> */}
                        <h4>{Age}</h4>
                    </div>
                    <span>{distance} Kms away</span>
                </div>
            </div>
        </div>
    )
}

export default CardUser