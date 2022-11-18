import { Link } from "react-router-dom"
import '../dashboard/index.css'
const SideBarHeader = () => {
    return (
        <div className="dahsboard-navigation">
            <Link to="/about/safety-tips">Safety Tips</Link>
            <Link to="/about/faqs">FAQS</Link>
        </div>
    )
}
export default SideBarHeader