import { SHOW_MODAL } from "../type";

const indexReducer = (state, action)=>{
    const { type, payload } = action
    
    switch(type){ 
        case SHOW_MODAL:
            return{
                signIn : false,
                signUp : false
            }
        case 'USER_SUCCESS':
            return{
                isLogin : true,
                user : payload
            }
        case 'AUTH_ERROR':
            return{
                ...state
            }
        case 'SHOW_MODAL_LOGIN':
            return{
                signIn : true,
                signUp : false
            }
        case 'SHOW_MODAL_REGISTER':
            return{
                signIn : false,
                signUp : true
            }
        case 'LOGIN_SUCCESS':
            localStorage.setItem("token", payload.token)
            return{
                isLogin : true,
                user : payload
            }
        case 'SUB':
            return{
                isLogin : true,
                user : {
                    sub : true
                }
            }
        case 'LOGOUT':
            localStorage.removeItem("token");
            return{
                isLogin : false,
                user : {}
            }
        default: 
            throw new Error()
    }
}

export default indexReducer 