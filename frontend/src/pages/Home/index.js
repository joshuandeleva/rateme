import React, { useState, useEffect } from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

import { useNavigate } from "react-router-dom"
import Button from '../../components/button/Button'
import Navbar from '../../components/navigation/Navbar'
import Footer from "../Footer/index"
import './index.css'
import { flexbox } from '@mui/system';

function Index() {
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 800)

    }, [])
    let navigate = useNavigate();

    //route to register page
    const handleNaviagte = () => {
        navigate('/user/accountsetup')
    }
    return (
        <>
            {loading ?
                // <ClipLoader color={'#000'} loading={loading} size={150} aria-label="Loading Spinner" />
                <div className="d-flex justify-content-center loader">
                    <ScaleLoader className='d-flex justify-content-center' color="#FFC247" speedMultiplier={4} />
                </div>
                :
                <div className='homePage'>

                    <div className="homePage__items">
                        <Navbar />
                        <div className="homePage__intro d-flex flex-column justify-content-center align-items-center">
                            <p>   Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptas assumenda recusandae iusto necessitatibus, temporibus, quasi aperiam qui ipsum, tempora officiis rem quidem numquam? Tenetur officiis sunt nemo rem aperiam
                                te dolores?
                            </p>
                            <Button className="btn-home rounded" handleClick={handleNaviagte} children="Join StarMatched" />
                        </div>
                    </div>
                    <Footer />
                </div>
            }



        </>
    )
}

export default Index