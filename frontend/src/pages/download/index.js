import Navbar from '../../components/navigation/Navbar'
import { Container, Row, Col } from "react-bootstrap"
import download from "../../assets/images/download.png"
import playstore from "../../assets/images/Playstore.png"
import applestore from "../../assets/images/Applestore.png"
import { Link } from "react-router-dom"
import Footer from "../Footer/index"
import './index.css'
function index() {
    return (
        <div className='downloadPage'>
            <Navbar />
            <div className="downloadPage__details">
                <Container>
                    <Row>
                        <Col xm={12} sm={12} md={6} lg={6} xl={6} className="d-flex justify-content-center flex-column">
                            <h1>Supported Platforms and Devices</h1>
                            <p>Starmatched is currently available on iOS, Android, and HMS devices. Along with our mobile apps, you can visit Tinder.com to use Tinder for Web.</p>
                            <p>Starmatched currently supports iOS 12.0 and up, Android 7.0 and up, and the latest versions of all major web browsers (Chrome, Firefox, Safari, Edge, etc.).</p>
                            <div className="download-btns">
                                <Link to="/" style={{ paddingRight: "20px" }}>
                                    <img src={playstore} alt="" />
                                </Link>
                                <Link to="/">
                                    <img src={applestore} alt="" />
                                </Link>
                            </div>
                        </Col>
                        <Col xm={12} sm={12} md={6} lg={6} xl={6} className="d-flex justify-content-center flex-column">
                            <img src={download} alt="" />
                        </Col>
                    </Row>
                </Container>
                <div className="contact-footer pt-lg-4">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default index