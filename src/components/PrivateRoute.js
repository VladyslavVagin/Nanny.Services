import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = ({ component: Component, redirectTo = '/home' }) => {
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);
    const shouldRedirect = !isLoggedIn;
  
    return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
  };
