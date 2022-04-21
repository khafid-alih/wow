import { useState, useEffect } from "react"
import {
    Image
} from "react-bootstrap"
import { Link } from "react-router-dom"

import { API, setAuthToken } from "../../config/Axios"

import AppBarAdmin from "../../components/Navigation/AppBarAdmin"

const Component = () =>{

    const styles = {
        mainCard : {
            width : "100%"
        },
        mainImage : {
            marginTop : "60px",
            width : "90%",
        },
        mainImageUp : {
            marginTop : "90px",
            marginLeft : "60px"
        },
        mainTypografi : {
            marginRight : "40px"
        },
        heading : {
            fontSize : "36px",
            fontWeight : "700",
            marginBottom : "30px"
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
            width : "10%",
            marginTop : "20px"
        },
        cardBottom : {
            marginTop : "75px",
            marginLeft : "100px",
            marginRight : "100px",
            width : "100%",
            marginBottom : "55px"
        }
    }

    localStorage.setItem('path', "/1/book")
    
    const [ books, setBook ] = useState([])
    
    const getBook = async () => {
        try {
            const response = await API.get("/book");
            setBook(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getBook();
    }, []); 

    return (
        <>
            <div>
                <AppBarAdmin />
                <div style={styles.cardBottom}>
                    <h1 style={styles.heading}>List Book</h1>
                    <div className="w-100 d-flex flex-wrap">
                    {books.map((item) => (
                        <div style={styles.groupBook} className="d-flex flex-column me-5">
                                <Image src={item.bookImage} style={{borderRadius : "10px", width:"100%"}}/>
                                <div>
                                    <h1 style={styles.headingBook}>{item.title}</h1>
                                    <p style={styles.authorBook}>{item.author}</p>
                                </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Component
