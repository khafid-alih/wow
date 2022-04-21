import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Image,
    Button,
} from "react-bootstrap"

import { API, setAuthToken } from "../../config/Axios";

import Register from '../../components/modal/Register'
import Login from '../../components/modal/Login'

import indexContext from "../../reducer/context/indexContext";

const Component = () =>{
    const styles = {
        mainImage : {
            height : "900px",
            width : "100%"
        },
        mainLogo : {
            height : "605px",
            width : "549px",
            marginLeft : "102px",
            marginTop : "79px"
        },
        description : {
            textAlign : "justify",
            fontSize : "24px",
            marginLeft : "30px",
            marginTop : "20px",
        },
        signIn : {
            marginTop : "53px",
            padding : "11px 62px",
            fontSize : "18px",
            fontWeight : "700",
            backgroundColor : "#CDCDCDB2",
            color : "Black",
            borderRadius : "5px"
        },
        signUp : {
            marginTop : "53px",
            padding : "11px 66px",
            fontSize : "18px",
            fontWeight : "700",
            backgroundColor : "#D60000",
            color : "#FFFFFF",
            borderRadius : "5px",
            marginRight : "30px"
        }
    }

    document.title = "WOW"

    const [ state, dispatch] = useContext(indexContext);

    return (
        <div className="position-relative">
            <div className="position-absolute" style={styles.mainLogo}>
                <img src="./assets/main-icon.png" />
                <div style={styles.description}>
                    <p>Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
                    <Button 
                    variant="light" 
                    className="shadow-sm" 
                    onClick={() => dispatch({ type : "SHOW_MODAL_REGISTER" })} 
                    style={styles.signUp}
                    >Sign Up
                    </Button>

                    <Button 
                    variant="light" 
                    onClick={() => dispatch({type : "SHOW_MODAL_LOGIN"})}
                    style={styles.signIn} 
                    >Sign In
                    </Button>
                </div>
            </div>
            <div>
                <Image src="./assets/index.png" style={styles.mainImage}/>
            </div>

            <Register 
            show={state?.signUp}
            onHide={() => dispatch({type : "SHOW_MODAL"})}
            />

            <Login 
            show={state?.signIn}
            onHide={() => dispatch({type : "SHOW_MODAL"})}
            />

        </div>
    )
}

export default Component