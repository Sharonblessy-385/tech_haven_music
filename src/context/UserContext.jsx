import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextAPI } from "./AuthContext";
import toast from "react-hot-toast";
import { __DB } from "../backend/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export let UserContextAPI = createContext(null);


let UserContext = ({children})=>{
    let {authUser}=useContext(AuthContextAPI);
    console.log(authUser);
    
    let [userDataFromDB,setUserDataFromDB]=useState(null);
    let fetchDataFromDB =async()=>{
        console.log("fetchdb starting");
        
        if(authUser !=null){
            console.log("authuser condition");
            
            try{
                let userDataReference=doc(__DB,"user_profile",authUser?.uid);
                onSnapshot(userDataReference,(user)=>{
                    if(user.exists){

                        setUserDataFromDB(user?.data())
                        // console.log(user?.data());
                        
                    }

                })

            }catch(error){
                toast.error(error.message)
            }
        }

    }
    useEffect(()=>{
fetchDataFromDB()
    },[authUser])

return<UserContextAPI.Provider value={{userDataFromDB}}>
    {children}

</UserContextAPI.Provider>

}
export default UserContext