import React from 'react'
import { AiFillProfile } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { LuUserPlus } from 'react-icons/lu'
import { MdSupervisorAccount } from 'react-icons/md'

import { RiAccountCircleFill, RiDeleteBack2Fill, RiProfileLine, RiUserAddLine } from 'react-icons/ri'
import { TbPasswordUser } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

const UserSideBar = () => {
  return (
<section className='p-7'>   
    <article>
      <ul className='flex flex-col gap-4'>
        <li><NavLink end to={"/user-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiAccountCircleFill /></span><span>My Account</span></NavLink></li>
        <li><NavLink to={"update-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><ImProfile /></span><span>Update Profile</span></NavLink></li>
        <li><NavLink to={"add-profile"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span></span><RiUserAddLine /><span>Add Profile</span></NavLink></li>
        <li><NavLink to={"update-password"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><TbPasswordUser /></span><span>Update Password</span></NavLink></li>
        <li><NavLink to={"delete-account"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiDeleteBack2Fill /></span><span>Delete Account</span></NavLink></li>  
        </ul>
    </article>
  
</section> 
  )
  
}

export default UserSideBar