import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Modal,
    Form,
    Alert
} from "react-bootstrap"

import { API } from '../../config/Axios'

import indexContext from "../../reducer/context/indexContext";

const Login = (props) => {
    const styles = {
        modalMainSize : {
            width : "416px",
            // height : "408px",
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
    const navigate = useNavigate();
    
    const [, dispatch] = useContext(indexContext);

    // to modal register
    function handleSwitchModal(){
        dispatch({ 
            type : "SHOW_MODAL_REGISTER" 
        })
    }

    // handle change form sign in
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
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
            const response = await API.post("/login", body, config);
      
            // Checking process
            if (response?.status === 200) {
              // Send data to useContext
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
              })

              const alert = (
                <Alert variant="success" className="py-1">
                  Login success
                </Alert>
              );
              setMessage(alert);
            //   Status check
              if (response.data.data.role === "Admin") {
                navigate('/1')
            } else {
                navigate('/0')
              }
              
            }
          } catch (error) {
            const alert = (
              <Alert variant="danger" className="py-1">
                Login failed
              </Alert>
            );
            setMessage(alert);
            console.log(error);
          }
    }

    return (
        <>
            <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            // style={styles.modalMainSize}
            size="md"
            centered
            >
            <Modal.Body>
                <div style={styles.modalBody}>
                    <h4 style={styles.modalheading}>Sign In</h4>
                    <div>
                    {message && message}
                    <Form onSubmit={hendleOnSubmit}>
                        <Form.Group>
                            <Form.Control 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                name="email"
                                onChange={handleChange}
                                style={styles.inputForm}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                value={password}
                                name="password"
                                onChange={handleChange}
                                style={styles.inputForm}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100" style={styles.buttonForm}>
                            Sign In
                        </Button>
                        <div className="text-center" style={styles.switchForm}>
                            <p>Don't have an account ? Klik    
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

export default Login