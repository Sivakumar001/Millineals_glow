import React from 'react';
import { Navigate } from 'react-router-dom';
const userAuth=()=>{
if(localStorage.getItem('login') || localStorage.getItem('admin')){
    return true
}
else{
    return false
}
}
const Protected = ({children}) => {
    const auth=userAuth();
    if(!auth){
        return <Navigate to='/login'/>
    }
    return children
};

export default Protected;