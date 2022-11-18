import React from 'react'
import './SwipeButton.css'
import { MdReplay, MdFavoriteBorder, MdStarRate, MdFlashOn, MdClose } from "react-icons/md"
import IconButton from '@mui/material/IconButton';
function SwipeButtons() {
    return (
        <div className='swipeButtons'>
            <IconButton className='swipeButtons__repeat'>
                <MdReplay />
            </IconButton>
            <IconButton className='swipeButtons__left'>
                <MdClose />
            </IconButton>
            <IconButton className='swipeButtons__star'>
                <MdStarRate />
            </IconButton>
            <IconButton className='swipeButtons__right'>
                <MdFavoriteBorder />
            </IconButton>
            <IconButton className='swipeButtons__lighting'>
                <MdFlashOn />
            </IconButton>
        </div>
    )
}

export default SwipeButtons