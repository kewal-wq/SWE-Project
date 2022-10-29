import React from "react";
import { Navigate } from "react-router-dom";
import {toast} from "react-toastify";

const PrivateRoute = ({user, children}) => {
    const token = localStorage.getItem("token");
    if(!token){
        toast.error("Please login to access this page",{
            toastId: 'success1',
        });
    }
    return token ? children : <Navigate to="/auth" />;
}

export default PrivateRoute;