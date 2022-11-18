import React from 'react'
import './sidebarOption.css'
import { Link } from "react-router-dom"
const SidebarOption = ({ Icon, title, active, url }) => {
    return (
        <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
            <Icon className="sidebarOption__Icon" />
            <h2 className='sidebarOption__title'>{title}</h2>
        </div>
    )
}
export default SidebarOption