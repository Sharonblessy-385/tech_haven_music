import { NavLink, useNavigate } from "react-router-dom"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../utilities/Spinner";
// import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { __AUTH } from "../../backend/firebase";
// import { sendPasswordResetEmail } from "firebase/auth/cordova";
import { signOut, updatePassword } from "firebase/auth";
import { AuthContextAPI } from "../../context/AuthContext";



let UpdatePassword = () =>{

  let {authUser,setAuthUser}=useContext(AuthContextAPI);
    let[isLoading, setIsloading]=useState(false);
    let navigate = useNavigate();

    let intialState={
      newPassword:"",
      confirmNewPassword:""
    }

    let [passwordData,setPasswordData]=useState(intialState)
    let handleInputChange=(e)=>{
      let {name,value}=e.target;
      setPasswordData({
        ...passwordData,[name]:value
      })
    };
    let {newPassword,confirmNewPassword}=passwordData;



   
let handleSubmit = async (e)=>{
    e.preventDefault();
try{
    setIsloading(true);
 if(newPassword==confirmNewPassword){
  await  updatePassword(authUser,newPassword);
  toast.success("password has been changed succesfully")
  signOut(__AUTH);
  setAuthUser(null);
  navigate("/login");
 }else{
  toast.error("new password should match with confirm npassword")
 }
 
 
}    catch (error) {
  toast.error(error.message)
   console.log(error);
   

}finally{
  setIsloading(false);
}

}


    return <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center">  
<article className="w-[27%] bg-slate-700 py-4 px-6">
    <header>
        <h1 className="text-center text-[24px] font-semibold">Update Password</h1>
        </header>
<main>
    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
    
    <div>
        <label htmlFor="newPassword" className="block py-1">New Password</label>
    <input type="text" placeholder="Enter  new Password" name="newPassword"  required onChange={handleInputChange} className="outline-none border-1 w-[100%] rounded-md pl-2 py-1"/>
    </div>
    <div>
        <label htmlFor="confirmNewPassword" className="block py-1">Confirm New Password</label>
    <input type="password" placeholder="confirm  new Password" name="confirmNewPassword"  required onChange={handleInputChange} className="outline-none border-1 w-[100%] rounded-md pl-2 py-1"/>
    </div>
  
    
    <div className="mt-3">
        <button className="bg-blue-600 w-[100%] py-2 rounded-md cursor-pointer hover:bg-blue-800">Submit</button>
    </div>
   
   
    </form>
    </main>
    </article>
    {isLoading && <Spinner/>}
    </section>
}

export default UpdatePassword