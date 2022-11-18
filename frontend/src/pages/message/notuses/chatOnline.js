import React, { useState, useEffect } from 'react'
import './chatOnline.css'
export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [stars, setStars] = useState([])
    const [onlineStars, setOnlineStars] = useState([])
    useEffect(() => {

    })

    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="" alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName"></span>
            </div>
        </div>
    )
}
