import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { getAllusers } from '../../utils/apirequests/userRequest'
import { BsHeartFill } from "react-icons/bs"
import { ImCross } from "react-icons/im"
import { SiWish } from "react-icons/si"
import './tinderCard.css'
function TinderCards() {
    const [users, setUsers] = useState([])
    const [userStar, setUserStar] = useState([])
    const [lastDirection, setLastDirection] = useState()

    useEffect(() => {
        const getUserFromDB = async () => {
            try {
                const { data } = await getAllusers()
                setUsers(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserFromDB()
    }, [])

    //get user by starSign


    //update Matches here
    const updateMatches = async (matchedUserId) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    //swipe left

    const swipedLeft = (direction, swipedUserId) => {
        if (direction === 'left') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    //swiped right
    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)

    }

    //control swipe behavior
    const outOfFrame = (name) => {
        console.log(name + 'Left the screeen')
    }
    return (
        <div className='swipe-container'>
            <div className='card-container'>
                {users.map((user) => (
                    <TinderCard className="swipe" key={user._id}>
                        <div className="cardContainer__bgImg" style={{ backgroundImage: `url(${user.image})` }}>
                            <div className="cardContainer__content">
                                <p>{user.prefered_name}</p>
                                <div className="cardContainer__Icons">
                                    <ImCross className='icon-n' />
                                    <BsHeartFill className='icon-l' />
                                    <SiWish className='icon-w' />
                                </div>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards
