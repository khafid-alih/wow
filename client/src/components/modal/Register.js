import React, { useContext, useState } from "react";
import {
    Button,
    Modal,
    Form
} from "react-bootstrap"

import indexContext from "../../reducer/context/indexContext";

import { API } from "../../config/Axios";

const Register = (props) => {
    const styles = {
        modalMainSize : {
            width : "416px",
            marginLeft : "37%",
        },
        modalBody : {
            padding : "40px 33px 20px 33px",
        },
        modalheading : {
            fontWeight : "700",
            fontSize : "36px",
            marginBottom : "30px",
        },
        buttonForm : {
            backgroundColor : "#D60000",
            color : "#FFFFFF",
            fontSize : "18px",
            fontWeight : "600",
            padding : "13px 0",
            border : "none",
            marginTop : "16px",
            marginBottom : "20px"
        },
        inputForm : {
            fontSize : "18px",
            marginBottom : "20px",
            height : "50px",
            width : "100%" //350
        },
        switchForm : {
            color : "#333333",
            fontSize : "18px",
            fontWeight : "400",
            lineHeight : "25px"
        },
        switchFormA : {
            color : "#333333",
            fontSize : "18px",
            fontWeight : "700",
            lineHeight : "25px",
            textDecoration : "none",
            cursor : "pointer"
        },
    }

    const [, dispatch] = useContext(indexContext);

    // to modal login
    function handleSwitchModal(){
        dispatch({
            type : "SHOW_MODAL_LOGIN"
        })
    }

    // handle change form sign up
    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: ""
    });

    const { email, password, fullName } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
        console.log(form);
    }

    async function hendleOnSubmit(e){
        try {
            e.preventDefault();
      
            // Configuration
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
      
            // Data body
            const body = JSON.stringify(form);
      
            // Insert data for login process
            const response = await API.post("/register", body, config);
            console.log(response.data);
      
            // Checking process
            if (response?.status === 200) {
              // Send data to useContext
              dispatch({
                type: 'SHOW_MODAL_LOGIN'
                })

            }
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                size="md"
                centered
            >
                <Modal.Body>
                    <div style={styles.modalBody}>
                        <h4 style={styles.modalheading}>Sign Up</h4>
                        <div>
                        <Form onSubmit={hendleOnSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email}
                                    name="email"
                                    onChange={handleChange}
                                    style={styles.inputForm}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" >
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    name="password"
                                    onChange={handleChange}
                                    style={styles.inputForm}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicFullName" >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Full Name" 
                                    value={fullName}
                                    name="fullName"
                                    onChange={handleChange}
                                    style={styles.inputForm}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100" style={styles.buttonForm}>
                                Sign Up
                            </Button>
                            <div className="text-center" style={styles.switchForm}>
                                <p>Already have an account ? Klik 
                                    <a onClick={handleSwitchModal} style={styles.switchFormA}> Here</a>                                                            
                                </p>
                            </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Register