// import React, { useEffect, useState } from 'react'
// import { getMyUser } from '../../utils/apirequests/userRequest'
// export default function ChatHeader({ chat, currentUser }) {
//     const [loggedUser, setLoggedUser] = useState(null)
//     useEffect(() => {
//         const userId = chat?.members?.find((id) => id !== currentUser)
//         const getChatHeaderData = async () => {
//             try {
//                 const { data } = await getMyUser(userId)
//                 setLoggedUser(data)

//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         if (chat !== null) getChatHeaderData()
//     }, [chat, currentUser])
//     return (
//         <div className='myChatHeader'>
//             <div>
//                 <img src={loggedUser?.image} alt="" />
//                 <span>{loggedUser?.full_name}</span>
//             </div>
//         </div>
//     )
// }
