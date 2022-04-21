import { Button } from "bootstrap"
import React, { useEffect, useState } from "react"
import {
  ReactReader,
  ReactReaderStyle
} from "react-reader"
import { Link, useParams } from "react-router-dom"
import { API } from "../../config/Axios"

const ContentReadingBook = () => {
    
    const ownStyles = {
      ...ReactReaderStyle,
      arrow: {
        ...ReactReaderStyle.arrow,
        color: 'red'
      }
    }

    const styles = {
        buttonBook : {
            height : "50px",
            marginRight : "20px",
            fontSize : "18px",
            backgroundColor : "#D60000",
            border : "none",
            padding : "10px 50px",
            color:"white",
            textDecoration:"none",
            borderRadius:"30px 8px 8px 30px",
            fontSize:"18px",
            fontWeight:"600"
        }
    }

    const { id } = useParams()

    localStorage.setItem('path', `/0/read-book/${id}`)

    const [book, setBook] = useState([])
    
    const getBook = async (id)=>{
        try {
            const response = await API.get("/book/" + id)
            setBook(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        getBook(id)
    },[])

    return (
    <>
        <div style={{ height: "75vh" }} className="myReader">
        <ReactReader
            url={"http://localhost:4000/uploads/book/"+book.bookFile}
            styles={ownStyles}
            />
        </div>
        <div className="text-end me-5 mt-4">
            <Link to={"/0/book/" + book.id} style={styles.buttonBook}>
                {/* <Button style={styles.buttonBook} >
                    Back
                </Button> */}
                Back
            </Link>
        </div>
    </>
  )
}

export default ContentReadingBook