import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Image, Form, InputGroup, Button } from "react-bootstrap"

import { API, setAuthToken } from "../../config/Axios";

const Commponent = () => {
    const styles = {
        sectionTabel : {
            margin : "40px 225px 120px 225px"
        },
        inputForm : {
            height : "50px",
            marginBottom : "30px",
        },
        inputFormmm : {
            backgroundColor : "rgba(210, 210, 210, 0.25)",
            height : "50px",
            marginBottom : "30px",
            borderRadius : "3px",
            cursor : "pointer",
            color : "grey",
            fontSize : "18px",
            padding : "10px",
            border : "solid 1px rgba(210, 210, 210, 0.75)"
        },
        inputFormm : {
            height : "50px",
            marginTop : "180px",
        },
        inputNumb : {
            height : "50px",
            fontSize : "18px",
            color : "#333333",
            backgroundColor : "rgba(210, 210, 210, 0.25)"
        },
        inputNumbTa : {
            height : "200px",
            resize : "none",
            fontSize : "18px",
            color : "#333333",
            backgroundColor : "rgba(210, 210, 210, 0.25)"
        },
        inputFile : {
            height : "50px",
            fontSize : "18px",
            color : "red",
            backgroundColor : "rgba(210, 210, 210, 0.25)",
        },
        buttonForm : {
            backgroundColor : "#D60000",
            height : "50px",
            marginTop : "15px",
            border : "none",
            width : "150px"
        },
        headingStyle : {
            fontSize : "36px",
            fontWeight : "700",
            marginBottom : "40px",
        },
    }

    localStorage.setItem('path', "/0/edit-profile")

    const navigate = useNavigate()

    const [preview, setPreview] = useState(null); //For image preview
    const [previewImage, setPreviewImage] = useState(null); //For image preview

    const [form, setForm] = useState({
        title: "",
        publicationDate: "",
        pages : "",
        author : "",
        ISBN : "",
        desc : "",
        bookFile : "",
        bookImage : ""
    });

    const { title } = form;

    const handleChange = (e) => {
        console.log(form);
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

    
        if (e.target.name === "bookFile") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
        if (e.target.name === "bookImage") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreviewImage(url);
        }
    }

    const handleOnSubmit = async (e) => {
        try {
          e.preventDefault();

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
          formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);
          formData.set("bookImage", form.bookImage[0], form.bookImage[0].name);
          formData.set("title", form.title);
          formData.set("publicationDate", form.publicationDate);
          formData.set("page", form.pages);
          formData.set("author", form.author);
          formData.set("ISBN", form.ISBN);
          formData.set("desc", form.desc);
    
          // Insert product data
          await API.post("/book", formData, config);
          
          navigate('/0/profile')
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <>
            <div className="w-100 pt-5 mt-5">
                <div style={styles.sectionTabel}>
                    <div>
                        <h1 style={styles.headingStyle}>Edit Profile</h1>
                    </div>
                    <div>
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Group controlId="formBasicTitle" style={styles.inputForm}>
                                <Form.Control 
                                type="text" 
                                placeholder="Title" 
                                name="title"
                                value={title}
                                onChange={handleChange}
                                style={styles.inputNumb}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicDate" style={styles.inputForm}>
                                <Form.Control 
                                type="date" 
                                placeholder="Publication Date" 
                                name="publicationDate"
                                onChange={handleChange}
                                style={styles.inputNumb}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPage" style={styles.inputForm}>
                                <Form.Control 
                                type="text" 
                                placeholder="Pages" 
                                name="pages"
                                onChange={handleChange}
                                style={styles.inputNumb}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicAuthor" style={styles.inputForm}>
                                <Form.Control 
                                type="text" 
                                placeholder="Author" 
                                name="author"
                                onChange={handleChange}
                                style={styles.inputNumb}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicISBN" style={styles.inputForm}>
                                <Form.Control 
                                type="text" 
                                placeholder="ISBN" 
                                name="ISBN"
                                onChange={handleChange}
                                style={styles.inputNumb}
                                />
                            </Form.Group>
                            <div>
                            <Form.Group controlId="formBasicDesc" style={styles.inputForm}>
                                <Form.Control 
                                as="textarea" 
                                type="text" 
                                name="desc"
                                onChange={handleChange}
                                placeholder="About This Book" 
                                style={styles.inputNumbTa}
                                />
                            </Form.Group>
                            </div>
                            <Form.Group controlId="formBasicFile" style={styles.inputFormm} className="mb-4">
                                <div className="d-flex " >
                                    <div className="w-25">
                                        <InputGroup>
                                            {/* {preview && (
                                                <div>
                                                <img
                                                    src={preview}
                                                    style={{
                                                    maxWidth: "150px",
                                                    maxHeight: "150px",
                                                    objectFit: "cover",
                                                    }}
                                                    alt="preview"
                                                />
                                                </div>
                                            )} */}
                                            <Form.Control 
                                            id="uploadBook"
                                            type="file" 
                                            name="bookFile"
                                            onChange={handleChange}
                                            placeholder="Attache Book File" 
                                            hidden
                                            style={styles.inputFile} 
                                            />
                                            <label for="uploadBook" style={styles.inputFormmm} >
                                                Attache Book File <Image src="../../assets/icen-file.png" className="ms-3"/>
                                            </label>
                                        </InputGroup>
                                    </div>
                                    <div className="w-25">
                                        <InputGroup>
                                            {previewImage && (
                                                <div>
                                                <img
                                                    src={previewImage}
                                                    style={{
                                                    maxWidth: "150px",
                                                    maxHeight: "150px",
                                                    objectFit: "cover",
                                                    }}
                                                    alt="preview"
                                                />
                                                </div>
                                            )}
                                            <Form.Control 
                                            id="uploadImage"
                                            type="file" 
                                            name="bookImage"
                                            onChange={handleChange}
                                            placeholder="Attache Book Image" 
                                            hidden
                                            style={styles.inputFile} 
                                            />
                                            <label for="uploadImage" style={styles.inputFormmm} >
                                                Attache Book Image <Image src="../../assets/icen-file.png" className="ms-3"/>
                                            </label>
                                        </InputGroup>
                                    </div>
                                </div>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit"  style={styles.buttonForm}>
                                Add Book
                                <Image className="ms-3" src="../../assets/icon-add-book-white.png"/>
                            </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Commponent