import { Link } from "react-router-dom"
import { Image, Dropdown } from "react-bootstrap"
import { useEffect, useState } from "react"
import { API, setAuthToken } from "../../config/Axios"

const Commponent = () => {
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

    const [ profile, setProfile ] = useState(null)

    const getMyProfile = async () =>{
        try {
            setAuthToken(localStorage.token)
            const response = await API.get("/profile")
            setProfile(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyProfile()
    }, [])

    return(
        <>
            <div className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/1/">
                        <div style={styles.logoImage}>
                            <Image src="../../assets/sec-icon.png" />
                        </div>
                    </Link>
                    <div style={styles.adminImage}>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" >
                                <Image src="../../assets/admin.png" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" style={{fontSize : "24px", fontWeight : "900"}} className="p-2 pe-4">
                                <Dropdown.Item className="m-3" style={{fontSize : "24px", fontWeight : "700"}}>
                                    <Link to="/1/" style={{textDecoration : 'none', color : "black"}}>
                                        Home
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item className="m-3" style={{fontSize : "24px", fontWeight : "700"}}>
                                    <Link to="/1/book/" style={{textDecoration : 'none', color : "black"}}>
                                        Book
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item className="m-3" style={{fontSize : "24px", fontWeight : "700"}}>
                                    <Link to="/1/add-book/" style={{textDecoration : 'none', color : "black"}}>
                                        <Image className="me-3" src="../../assets/icon-add-book.png" />
                                        Add Book
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item className="m-3" style={{fontSize : "24px", fontWeight : "700"}}>
                                    <Link to="/logout" style={{textDecoration : 'none', color : "black"}}>
                                        <Image className="me-3" src="../../assets/icon-logout-red.png" />
                                        Log Out
                                    </Link>
                                </Dropdown.Item>
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Commponent