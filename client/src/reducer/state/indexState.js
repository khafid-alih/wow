import React, { useReducer} from "react";
import indexContext from "../context/indexContext";
import indexReducer from "../reducer/indexReducer";

const IndexState = ({children}) =>{
    const initialState = {
        isLogin : false,
        signIn : false,
        signUp : false,
        user : {}
    }

    const [state, dispatch] = useReducer(indexReducer, initialState)

    return(
        <indexContext.Provider
            value={[state, dispatch]}
        >
            {children}
        </indexContext.Provider>
    )
}   

export default IndexState