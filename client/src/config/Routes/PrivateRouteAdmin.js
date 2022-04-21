// import necessary utility from rrd
import { useContext } from 'react';

import { Outlet, Navigate } from 'react-router-dom'

import indexContext from "../../reducer/context/indexContext";

const PrivateRouteAdmin = () => {
    const [state,] = useContext(indexContext);

    return (
        state?.isLogin ? 
            state?.user?.role === 'admin' ? 
                <Outlet /> : <Navigate to="/0/" /> 
            : <Navigate to="/" />
    )
}

export default PrivateRouteAdmin
