import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { checkToken } from '../../utils/checkToken';


const RequireAuth = ({allowedRoles}) => {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("creds"));
  
  return (
    checkToken() && auth?.role === allowedRoles ? 
        <Outlet/>
    :
      auth?._id ? 
       
        <Navigate to="/unauthorized"  state={{ from: location }} replace/>  
        :
        <Navigate to="/login"  state={{ from: location }} replace/>    
  )
}

export default RequireAuth