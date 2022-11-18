import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_API_URL } from '../../utils/BaseUrl'
import axios from 'axios'
export function useLogin() {
    const [successMessage, setSucessMessage] = useState('')
    const [userDetails, setUserDetails] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    let navigate = useNavigate();
    const login = async (email, password) => {
        const requestOptions = {
            method: 'POST',
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }
        try {
            const response = await axios(`${BASE_API_URL}/api/auth/login`, requestOptions)
            setSucessMessage('Login was successful')
            localStorage.setItem('userData', JSON.stringify(response.data))
            localStorage.setItem('accessToken', JSON.stringify(response.data?.accessToken))
            setErrorMessage('')
            setUserDetails(response.data)
            navigate('/user/dashboard')

        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                setErrorMessage(error.response.data)
                setSucessMessage('');
            }
        }
    }
    return login
} 
