import { Navigate, Outlet } from "react-router-dom"
const PrivateRoute = ({ userData }) => {
    return userData ? <Outlet /> : <Navigate to="/user/login" />
}
export default PrivateRoute