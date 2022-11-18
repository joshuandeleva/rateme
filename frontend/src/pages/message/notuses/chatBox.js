import React from 'react'
import './chat.css'
import { IoIosSend } from "react-icons/io"
export default function ChatBox() {
    return (
        <div className='chatBox d-flex align-items-center justify-content-between'>
            <textarea className='chatBoxMessage' placeholder='say something'>
            </textarea>
            <button className="rounded px-5 btn-home"><IoIosSend /></button>
        </div>
    )
}
