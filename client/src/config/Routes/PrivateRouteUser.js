// import necessary utility from rrd
import { useContext } from 'react';

import { Outlet, Navigate } from 'react-router-dom'

import indexContext from "../../reducer/context/indexContext";

const PrivateRouteUser = () => {
    const [state,] = useContext(indexContext);

    return (
        state?.isLogin ? 
            state?.user?.role === 'user' ? 
                <Outlet /> : <Navigate to="/1/" /> 
            : <Navigate to="/" />
    )
}

export default PrivateRouteUser
