import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import { getUserFromLocalStorage } from '../../utils/localstorageData'
export default function MessageForm() {
    const [message, setMessage] = useState("")
    const [user, setUser] = useState(null)
    const [seectedUser, setSelectedUser] = useState(null)

    //get user from local storage

    useEffect(() => {
        const loggedUser = getUserFromLocalStorage('userData').user
        setUser(loggedUser)

    }, [])


    //handleSelected user
    const handleSelectedUser = (user) => {

    }


    const socket = io("http://localhost:5000")

    return (
        <div>message</div>
    )
}
