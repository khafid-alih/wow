import { useEffect, useState, useContext } from "react"
import {
    Button,
    Image
} from "react-bootstrap"
import { API, setAuthToken } from "../../config/Axios"
import { Link } from "react-router-dom"

import indexContext from "../../reducer/context/indexContext"

const Commponent = () =>{
    const styles = {
        mainCard : {
            width : "100%",
            marginTop : "60px"
        },
        cardProfile : {
            backgroundColor : "#FFD9D9",
            width : "995px"
        },
        heading : {
            fontSize : "36px",
            fontWeight : "700",
            marginBottom : "30px",
        },
        headingBook : {
            fontSize : "24px",
            fontWeight : "700",
            marginTop : "20px",
            marginBottom : "15px",
            color:"black"
        },
        authorBook : {
            fontSize : "18px",
            fontWeight : "400",
            marginBottom : "15px",
            color : "#929292",
        },
        groupBook : { 
            width : "20%",
            marginTop : "5px"
        },
        buttonProfile : {
            fontSize : "18px",
            fontWeight : "600",
            backgroundColor : "#D60000",
            border : "none",
            height : "50px",
            textDecoration: "none",
            color : "white",
            borderRadius:"8px",
            padding : "10px"
        },
        headingData : {
            fontSize : "14px",
            color : "#050505"
        },
        contentData : {
            fontSize : "12px",
            color : "#8A8C90"
        },
        cardBottom : {
            marginBottom : "50px",
            marginTop : "70px"
        }
    }

    localStorage.setItem('path', "/0/profile")

    const [ state, dispatch ] = useContext(indexContext)

    const [ profile, setProfile ] = useState(null)
    const [ bookmark, setBookmark ] = useState([])

    const getMyProfile = async () =>{
        try {
            setAuthToken(localStorage.token)
            const response = await API.get("/profile")
            setProfile(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getMyBook = async () =>{
        try {
            setAuthToken(localStorage.token)
            const response = await API.get("/bookmark")
            setBookmark(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyProfile()
        getMyBook()
    }, [])
    
    return (
        <>
            <div style={styles.mainCard} className="ms-4 pe-5 me-5">
                <h1 style={styles.heading}>Profile</h1>
                { profile == null ? 
                <div style={styles.cardProfile} className="d-flex justify-content-between px-5 pt-5 pb-4 mb-5 me-5">
                    <div>
                        <div className="d-flex align-items-center mb-3" >
                            <Image src="../../assets/icon-mail.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>-</h1>
                                <p style={styles.contentData}>Email</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3" >
                            <Image src="../../assets/icon-sex.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>-</h1>
                                <p style={styles.contentData}>Gender</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3" >
                            <Image src="../../assets/icon-call.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>-</h1>
                                <p style={styles.contentData}>Mobile Phone</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center" >
                            <Image src="../../assets/icon-place.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>-</h1>
                                <p style={styles.contentData}>Address</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column w-25">
                        <Image src="../../assets/ava-big.png" className=""/>
                        <Button className="mt-3" style={styles.buttonProfile}>Edit Profile</Button>
                    </div>
                </div>
                    :
                <div style={styles.cardProfile} className="d-flex justify-content-between px-5 pt-5 pb-4 mb-5 me-5">
                    <div>
                        <div className="d-flex align-items-center mb-3" >
                            <Image src="../../assets/icon-mail.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>{profile.user.email}</h1>
                                <p style={styles.contentData}>Email</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3" >
                            <Image src="../../assets/icon-sex.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>{profile.gender ? profile.gender : "-"}</h1>
                                <p style={styles.contentData}>Gender</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-3" >
                            <Image src="../../assets/icon-call.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>{profile.phone ? profile.phone : "-"}</h1>
                                <p style={styles.contentData}>Mobile Phone</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center" >
                            <Image src="../../assets/icon-place.png" className="me-3 pb-3"/>
                            <div>
                                <h1 style={styles.headingData}>{profile.address ? profile.address : "-"}</h1>
                                <p style={styles.contentData}>Address</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column w-25">
                        <Image src="../../assets/ava-big.png" className=""/>
                        <Link to="/0/edit-profile" className="mt-3" style={styles.buttonProfile}>
                            <div className="text-center w-100">Edit Profile</div>
                        </Link>
                    </div>
                </div>
                }
                { state.user.subs == "done" ? 
                <div style={styles.cardBottom}>
                    { bookmark.length === 0 ?
                    <>
                        <h1 style={styles.heading}>My List Book</h1>
                        <div className="w-100 d-flex  flex-wrap">
                            <h1 style={styles.authorBook}>anda belum memilih buku untuk dibookmark</h1>
                        </div>
                    </>
                        :
                    <>
                        <h1 style={styles.heading}>My List Book</h1>
                        <div className="w-100 d-flex  flex-wrap">
                            { bookmark.map((item)=>(
                            <div style={styles.groupBook} className="d-flex flex-column me-5">
                                <Link to={"/0/book/" + item.book.id} style={{textDecoration:"none"}}>
                                <Image src={"http://localhost:4000/uploads/cover/"+item.book.bookImage} style={{borderRadius : "10px", width:"100%"}}/>
                                <div>
                                    <h1 style={styles.headingBook}>{item.book.title}</h1>
                                    <p style={styles.authorBook}>{item.book.author}</p>
                                </div>
                                </Link>
                            </div>
                            ))}
                        </div>
                    </>
                    }
                </div>
                    : <></>
                }
            </div>
        </>
    )
}

export default Commponent