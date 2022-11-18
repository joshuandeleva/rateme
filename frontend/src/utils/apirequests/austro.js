import axios from 'axios'
const API = axios.create({ baseURL: "http://localhost:5000" })
API.interceptors.request.use((req) => {
    if (localStorage.getItem('userData')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userData')).accessToken}`;
    }
    return req
})
export const getByAustro = () => API.get('/api/user/matches/')