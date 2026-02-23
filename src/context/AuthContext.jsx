import { onAuthStateChanged } from "firebase/auth/cordova";
import { createContext, useEffect, useState } from "react"
import { __AUTH } from "../backend/firebase";

 export let AuthContextAPI = createContext();
let AuthContext = ({children}) =>{

    let [authUser, setAuthUser]= useState(null);
    useEffect(()=>{
 onAuthStateChanged(__AUTH, (user)=>{
    console.log(user);
    
     if(user?.emailVerified && user?.accessToken){
        setAuthUser(user);
        window.localStorage.setItem("TOKEN", user?.accessToken );
    
 }else{
    setAuthUser(null)
    window.localStorage.clear()
 }}
)
    },[])
    return <AuthContextAPI.Provider value={{authUser, setAuthUser}}>
{children}
    </AuthContextAPI.Provider>
}
export default AuthContext