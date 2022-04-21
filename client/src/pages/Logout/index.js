import { Navigate } from "react-router-dom"
import { useContext } from "react"
import IndexContext from "../../reducer/context/indexContext"

const Component = ()=>{
    const [ , dispatch ] = useContext(IndexContext) 

    dispatch({
        type : "LOGOUT"
    })

    return (
        <Navigate to="/" />
    )
}

export default Component