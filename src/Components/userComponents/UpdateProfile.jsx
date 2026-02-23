
import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import toast from 'react-hot-toast';
import Spinner from '../../utilities/Spinner';
import { updateProfile } from 'firebase/auth';

const UpdateProfile = () => {
  let {authUser,setAuthUser}=useContext(AuthContextAPI);
  let [imageFile,setImageFile]=useState(null);
  let [imagePreview,setImagePreview]=useState(null);
  let [isloading,setIsloading]=useState(false);
  let handleInputChange =(e)=>{
  let file=(e.target.files[0]);
  if (file){
    let imageUrl = URL.createObjectURL(file)
    setImagePreview(imageUrl);
    setImageFile(file)

    
  }
    
  }
  let handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      setIsloading(true);
      let imageFormData = new FormData();

    imageFormData.append("file", imageFile);
    imageFormData.append("upload_preset","tech_haven_music_382");
    imageFormData.append("cloud_name","dqisyrqnc")
    let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/dqisyrqnc/image/upload",{
      method:"POST",
      body:imageFormData
    })
    let ImageResponseFormDB=await(await cloudinaryResponse).json()
    console.log(ImageResponseFormDB);
    
    console.log(cloudinaryResponse);
    updateProfile(
      authUser,{
        photoURL:ImageResponseFormDB?.url 

      }
    );
    setAuthUser({
      ...authUser,photoURL:ImageResponseFormDB?.url
    })

    }catch(error){
      toast.error(error.message)
    }finally{
      setIsloading(false)
    }
    
  }
  return (
    <section className='h-full w-full flex justify-center items-center '>
      <article className='min-h-[400px] w-[35%] bg-slate-700 rounded-md py-4 px-8 flex flex-col gap-4 items-center'>
      <header>
        <h1 className='text-[24px] font-semibold text-center'>Update Profile</h1>
      </header>
      <main>
        <picture>
          <img src={imagePreview==null ?authUser?.photoURL:imagePreview} alt="" className='h-[240px] w-[235px] border rounded-full' />
        </picture>
      </main>
      <footer>
        
          <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image" className='block border text-center py-2 rounded-md font-semibold px-20'>Choose Picture</label>
            <input type="file" id='image' className='hidden' onChange={handleInputChange} />
         
          </div>
          <div className='mt-4'>
            <button className='bg-blue-600 w-full py-2 rounded-md'>Upload Picture</button>
          </div>
          </form>
        
      </footer>
      </article>
      {isloading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile