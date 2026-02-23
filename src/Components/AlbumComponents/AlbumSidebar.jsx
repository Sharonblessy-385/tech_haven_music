import React from 'react'
import { AiFillProfile } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { IoIosAlbums, IoMdAlbums } from 'react-icons/io'
import { LuUserPlus } from 'react-icons/lu'
import { MdSupervisorAccount } from 'react-icons/md'

import { RiAccountCircleFill, RiDashboardFill, RiDeleteBack2Fill, RiProfileLine, RiUserAddLine } from 'react-icons/ri'
import { TbPasswordUser } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

const AlbumSideBar = () => {
  return (
<section className='p-7'>   
    <article>
      <ul className='flex flex-col gap-4'>
        <li><NavLink end to={"/"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><RiDashboardFill /></span><span>Dashboard</span></NavLink></li>
        <li><NavLink to={"/favourites"} className={({isActive})=>`${isActive && "bg-blue-600"} flex items-center gap-2 px-2 py-1 rounded-md`}><span><IoMdAlbums /></span><span>Favourites</span></NavLink></li>
       
       </ul>
    </article>
  
</section> 
  )
  
}

export default AlbumSideBar