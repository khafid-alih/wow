import { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import SideBar from "../../components/Navigation/SideBar"
import { API } from "../../config/Axios"
import indexContext from "../../reducer/context/indexContext"

const Commponent = () => {
    const styles = {
        headingBook : {
            fontSize : "64px",
            fontWeight : "700"
        },
        headingAbout : {
            fontSize : "36px",
            fontWeight : "700",
            marginBottom : "25px"
        },
        authorBook : {
            fontSize : "24px",
            fontWeight : "400",
            color : "#929292",
            marginBottom : "65px"
        },
        detailBook : {
            fontSize : "24px",
            fontWeight : "700",
            marginBottom : "15px"
        },
        detailBookRed : {
            fontSize : "24px",
            fontWeight : "700",
            marginBottom : "15px",
            color : "#D60000"
        },
        detailBookContent : {
            fontSize : "18px",
            fontWeight : "400",
            color : "#929292",
            marginBottom : "35px"
        },
        aboutBookContent : {
            fontSize : "18px",
            fontWeight : "400",
            color : "#929292",
            textAlign : "justify"
        },
        buttonBookmark : {
            height : "50px",
            marginRight : "20px",
            fontSize : "18px",
            backgroundColor : "#D60000",
            border : "none"
        },
        buttonBookmarkDone : {
            height : "50px",
            marginRight : "20px",
            fontSize : "18px",
            backgroundColor : "rgba(205, 205, 205, 0.7)",
            border : "none",
            color : "black"
        },
        buttonBook : {
            height : "50px",
            fontSize : "18px",
            backgroundColor : "rgba(205, 205, 205, 0.7)",
            border : "none",
            color : "black"
        }
    }

    const { id } = useParams()

    localStorage.setItem('path', `/0/book/${id}`)

    const [detailBook, setDetailBook] = useState([])
    const [state] = useContext(indexContext)

    const getDetailBook = async (id) =>{
        try {
            const response = await API.get("/book/" + id)  
            setDetailBook(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDetailBook(id)
    }, [])

    const handleBookmark = async() =>{
        try {
            await API.post("/bookmark/"+ id)
            getDetailBook(id)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteBookmark = async() =>{
        try {
            await API.delete("/bookmark/"+ id)
            getDetailBook(id)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="d-flex ">
                <SideBar />
                <div className="pe-5 me-5 my-5">
                    <div className="d-flex mb-5 mt-5 pt-4">
                        <div>
                            <img src={detailBook.bookImage} style={{width: "400px", height: "540px", borderRadius:"10px"}} />
                        </div>
                        <div className="ms-5">
                            <div>
                                <h1 style={styles.headingBook}>{detailBook.title}</h1>
                                <p style={styles.authorBook}>{detailBook.author}</p>
                            </div>
                            <div>
                                <div>
                                    <h1 style={styles.detailBook}>Publication date</h1>
                                    <p style={styles.detailBookContent}>{detailBook.publicationDate}</p>
                                </div>
                                <div>
                                    <h1 style={styles.detailBook}>Pages</h1>
                                    <p style={styles.detailBookContent}>{detailBook.pages}</p>
                                </div>
                                <div>
                                    <h1 style={styles.detailBookRed}>ISBN</h1>
                                    <p style={styles.detailBookContent}>{detailBook.isbn}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 d-flex flex-column mb-4">
                        <h1 style={styles.headingAbout}>About This Book</h1>
                        <p style={styles.aboutBookContent}>
                            {detailBook.about}
                        </p>
                    </div>
                    <div className="d-flex justify-content-end mb-3">
                        { state.user.subs != 'done' ?
                                <Link to="/0/subscribe">
                                    <Button style={styles.buttonBookmark}>
                                        Subscribe
                                    </Button>
                                </Link>
                            :
                            detailBook.bookmarkedBy == true ?
                                <>
                                    <Button style={styles.buttonBookmarkDone} onClick={handleDeleteBookmark}>
                                        Bookmarked <img className="ms-3" src="../../assets/icon-bookmark.png" />
                                    </Button>
                                    <Link to={"/0/read-book/" + detailBook.id}>
                                        <Button style={styles.buttonBook} >
                                            Read Book <img className="ms-3" src="../../assets/icon-arrow.png" />
                                        </Button>
                                    </Link>
                                </>
                            :
                                <>
                                    <Button style={styles.buttonBookmark} onClick={handleBookmark}>
                                        Add My List <img className="ms-3" src="../../assets/icon-bookmark.png" />
                                    </Button>
                                    <Link to={"/0/read-book/" + detailBook.id}>
                                        <Button style={styles.buttonBook} >
                                            Read Book <img className="ms-3" src="../../assets/icon-arrow.png" />
                                        </Button>
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Commponent