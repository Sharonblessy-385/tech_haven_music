import React, { useContext } from 'react'
import { AuthContextAPI } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
import { UserContextAPI } from '../context/UserContext';

const AdminRoute = ({children}) => {
    let {userDataFromDB}=useContext(UserContextAPI); 
    console.log("data from admin route",userDataFromDB);
    
    if (userDataFromDB?.role=="admin"){
        return <>{children}</>
    }else{
        
        return <Navigate to={"/user-profile"}/>
    }
 
}

export default AdminRoute

