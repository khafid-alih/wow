import {
    Image,
    Form,
    Button,
    InputGroup
} from "react-bootstrap"

import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import indexContext from "../../reducer/context/indexContext"

import { API, setAuthToken } from "../../config/Axios"

const Commponent = () =>{
    const styles = {
        headingSub : {
            fontSize : "36px",
            fontWeight : "700",
            marginBottom : "45px",
            marginTop : "200px"
        },
        textSub : {
            fontSize : "18px",
            fontWeight : "400",
        },
        textSubImage : {
            marginLeft : "5px",
            width : "45px",
            height : "30px",
            marginRight : "10px"
        },
        containerNum : {
            marginBottom : "30px",
            marginTop : "20PX"
        },
        authorBook : {
            fontSize : "18px",
            fontWeight : "400",
            marginBottom : "15px",
            color : "#929292",
        },
        inputForm : {
            height : "50px",
            width : "350px",
            marginBottom : "15px"
        },
        inputNumb : {
            height : "50px",
            fontSize : "18px",
            color : "#333333",
            backgroundColor : "rgba(188, 188, 188, 0.25)"
        },
        inputFile : {
            height : "50px",
            fontSize : "18px",
            color : "red",
            backgroundColor : "white",
            cursor : "pointer",
            width : "100%",
            borderRadius : "5px",
            border: "solid 0.5px"
        },
        buttonForm : {
            backgroundColor : "#D60000",
            height : "45px",
            marginTop : "40px",
            border:"none",
            fontSize:"18px",
            fontWeight:"500",
        }
    }

    localStorage.setItem('path', "/0/subscribe")

    const [state, dispatch] = useContext(indexContext);


    const navigate = useNavigate()

    const [preview, setPreview] = useState(null); //For image preview
    const [subscribe, setSubscribe] = useState(false); //For from

    const [form, setForm] = useState({
        number: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

    
        if (e.target.type === "file") {
          let url = URL.createObjectURL(e.target.files[0]);
          console.log(url);
          setPreview(url);
        }
    }

    const handleOnSubmit = async (e) => {
        try {
          if (localStorage.token) {
            setAuthToken(localStorage.token);
            }
    
          // Configuration
          const config = {
            headers: {
                "Content-type": "multipart/form-data",
              },
          };
    
          // Store data with FormData as object
          const formData = new FormData();
          formData.set("imageProof", form.imageProof[0], form.imageProof[0].name);
        //   formData.set("number", form.number);
    
          // Insert product data
          await API.post("/transaction", formData, config);
          
          navigate('/0/')
        } catch (error) {
          console.log(error);
        }
      }

    const handleFormSubscribe = ()=>{
        setSubscribe(true)
    }

    return (
        <>
            { subscribe ?  
                <div className="w-100 d-flex justify-content-center">
                    <div className="d-flex align-items-center flex-column">
                        <h1 style={styles.headingSub}>Premium</h1>
                        <div className="d-flex justify-content-center">
                            <p style={styles.textSub}>Pay now and access all the latest books from </p>
                            <img style={styles.textSubImage} src="../../assets/small-icon.png"/>
                        </div>
                        <div style={styles.containerNum} className="d-flex justify-content-center">
                            <img style={styles.textSubImage}  src="../../assets/small-icon.png"/>
                            <p style={styles.textSub}>: 0981312323</p>
                        </div>
                        <div>
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Group controlId="formBasicA" style={styles.inputForm}>
                                <Form.Control 
                                type="text" 
                                placeholder="Input your account number" 
                                style={styles.inputNumb}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicB" style={styles.inputForm}>
                                <InputGroup>
                                    <Form.Control 
                                    type="file" 
                                    placeholder="Attache proof of transfer"  
                                    id="uploadImage"
                                    name="imageProof"
                                    onChange={handleChange}
                                    hidden
                                    />
                                    <label for="uploadImage"  style={styles.inputFile} className="p-2">
                                        Attache proof of transfer <Image src="../../assets/icon-file-red.png" style={{marginLeft : "100px"}}/>
                                    </label>
                                </InputGroup>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100" style={styles.buttonForm}>
                                Send
                            </Button>
                            {preview && (
                                <div className="mt-4 ms-5">
                                <img
                                    src={preview}
                                    style={{
                                    maxWidth: "350px",
                                    maxHeight: "350px",
                                    objectFit: "cover",
                                    }}
                                    alt="preview"
                                    className="ms-3"
                                />
                                </div>
                            )}
                        </Form>
                        </div>
                    </div>
                </div>
                :
                state.user.subs == 'done' ? 
                <> 
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <h1>Your premium package is<strong style={{color:"green"}}> ACTIVE</strong></h1>
                        </div>
                    </div>
                </>
                :
                state.user.subs == 'wait' ? 
                <> 
                    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="w-50">
                            <h1 >Thanks for subscribing to premium, your premium package still <strong style={{color:"orange"}}>PENDING</strong> and will be active after our admin approves your transaction.</h1>
                        </div>
                    </div>
                </>
                :
                state.user.subs == 'cancel' ? 
                <> 
                    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="w-50 d-flex flex-column justify-content-center">
                            <h1 >Your Transaction is <strong style={{color:"red"}}>CANCEL</strong> by our admin, make sure your transaction is correct. </h1>
                        </div>
                        <Button onClick={handleFormSubscribe} className="w-25 mt-5 p-2" style={{backgroundColor:"red", border:"none", fontSize:"24px", fontWeight:"600"}}>
                            subscribe
                        </Button>
                    </div>
                </>
                :
                state.user.subs == 'exp' ? 
                <> 
                    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="w-50">
                            <h1 >Your premium package is <strong style={{color:"brown"}}>EXPIRED</strong> please make a payment to get premium package.</h1>
                        </div>
                        <Button onClick={handleFormSubscribe} className="w-25 mt-5 p-2" style={{backgroundColor:"red", border:"none", fontSize:"24px", fontWeight:"600"}}>
                            subscribe
                        </Button>
                    </div>
                </>
                :
            <div className="w-100 d-flex justify-content-center">
                <div className="d-flex align-items-center flex-column">
                    <h1 style={styles.headingSub}>Premium</h1>
                    <div className="d-flex justify-content-center">
                        <p style={styles.textSub}>Pay now and access all the latest books from </p>
                        <img style={styles.textSubImage} src="../../assets/small-icon.png"/>
                    </div>
                    <div style={styles.containerNum} className="d-flex justify-content-center">
                        <img style={styles.textSubImage}  src="../../assets/small-icon.png"/>
                        <p style={styles.textSub}>: 0981312323</p>
                    </div>
                    <div>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group controlId="formBasicA" style={styles.inputForm}>
                            <Form.Control 
                            type="text" 
                            placeholder="Input your account number" 
                            style={styles.inputNumb}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicB" style={styles.inputForm}>
                            <InputGroup>
                                <Form.Control 
                                type="file" 
                                placeholder="Attache proof of transfer"  
                                id="uploadImage"
                                name="imageProof"
                                onChange={handleChange}
                                hidden
                                />
                                <label for="uploadImage"  style={styles.inputFile} className="p-2">
                                    Attache proof of transfer <Image src="../../assets/icon-file-red.png" style={{marginLeft : "100px"}}/>
                                </label>
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100" style={styles.buttonForm}>
                            Send
                        </Button>
                        {preview && (
                            <div className="mt-4 ms-5">
                            <img
                                src={preview}
                                style={{
                                maxWidth: "350px",
                                maxHeight: "350px",
                                objectFit: "cover",
                                }}
                                alt="preview"
                                className="ms-3"
                            />
                            </div>
                        )}
                    </Form>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Commponent