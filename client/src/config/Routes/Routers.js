import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

import PrivateRouteUser from "./PrivateRouteUser";
import PrivateRouteAdmin from "./PrivateRouteAdmin";

import indexContext from "../../reducer/context/indexContext";

import { API, setAuthToken } from '../Axios'

import { pages as Pages } from "../../pages";
const {
    Main,
    UserHome,
    UserProfile,
    UserSubcribe,
    UserDetailBook,
    UserReadBook,
    UserEditProfile,
    Logout,
    AdminHome,
    AdminBook,
    AdminAddBook
} = Pages


const Routers = () =>{

    const navigate = useNavigate()
    const [ state, dispatch] = useContext(indexContext);

    console.clear();

    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        // Redirect Auth
        if (!state.isLogin) {
            navigate("/");
        } else {
            if (state.user.role === "admin") {
                if(localStorage.path){
                    navigate(localStorage.path)
                }else{
                    navigate("/1/");
                }
            } else if (state.user.role === "user") {
                if(localStorage.path){
                    navigate(localStorage.path)
                }else{
                    navigate("/0/");
                }
            }
        }
    }, [state]);

    const checkUser = async () => {
        try {
        const response = await API.get("/check-auth");

        // If the token incorrect
        if (response.status === 404) {
            return dispatch({
            type: "AUTH_ERROR",
            });
        }

        // Get user data
        let payload = response.data.data.user;
        // Get token from local storage
        payload.token = localStorage.token;

        // Send data to useContext
        dispatch({
            type: "USER_SUCCESS",
            payload,
        });
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return(
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/0" element={<PrivateRouteUser />}>
                    <Route index element={<UserHome />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="subscribe" element={<UserSubcribe />} />
                    <Route path="book/:id" element={<UserDetailBook />} />
                    <Route path="read-book/:id" element={<UserReadBook />} />
                    <Route path="edit-profile" element={<UserEditProfile />} />
                </Route>
                <Route path="/1" element={<PrivateRouteAdmin />}>
                    <Route index element={<AdminHome />} />
                    <Route path="add-book" element={<AdminAddBook />} />
                    <Route path="book" element={<AdminBook />} />
                </Route>
                <Route path="/logout" element={<Logout />} />
            </Routes>
    )
}



export default Routers