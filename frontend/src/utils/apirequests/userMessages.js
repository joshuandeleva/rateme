import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' })
export const getAllMessages = (id) => API.get(`/api/message/${id}`)
export const addNewMessage = (data) => API.post('/message/', data)
