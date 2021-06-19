import React from 'react'
import { Navigate, Route } from 'react-router';
import { useAuth } from '../context/AuthContext';
export default function Redirect({ path , ...props } : any) {
   const {token } = useAuth()
    return (
       token !== null  ?  (
        <Route {...props} path={path} />
          ): (
            <Navigate state={{ from: path }} replace to="/login" />
          ) 
    )
}
