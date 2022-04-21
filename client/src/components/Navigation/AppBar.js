import { Link } from "react-router-dom"
import { Image, Button } from "react-bootstrap"

const AppBar = () => {
    const styles = {
        logoImage : {
            marginTop : "35px",
            marginLeft : "65px",
            width : "230px",
        },
        adminImage : {
            marginRight : "85px",
        },
    }

    return(
        <>
            <div className="w-100">
                <div className="d-flex justify-content-end align-items-center mb-4">
                    <Link to="/0/">
                        <div style={styles.logoImage}>
                            <Image src="../../assets/sec-icon.png" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AppBar