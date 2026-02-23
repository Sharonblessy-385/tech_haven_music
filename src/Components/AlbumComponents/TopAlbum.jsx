import React, { useContext } from 'react'
import { AlbumContextAPI } from '../../context/AlbumContext'
import { NavLink } from 'react-router-dom';

const TopAlbum = () => {

    let {allAlbums}=useContext(AlbumContextAPI);
    // console.log(allAlbums);
    
  return (
    <section>
        <article>
            <header><h1 className='text-[24px] font-semibold'>Top Albums</h1></header>
            <main className='py-4 flex  gap-4'>
                {allAlbums?.map((album,index)=>{
                    return <div key={index} className='h-[260px] w-[200px] p-3 bg-slate-800 rounded-md'>
                      <NavLink to={"/album-details"} state={album}>
                      <picture>
                            <img src={album?.albumPoster} className='h-[200px] w-[180px] rounded-sm' alt="" />
                        </picture>
                        <h1 className='text-center font-semibold '>{album?.albumTitle}</h1>
                      </NavLink>

                    </div>
                })}
            </main>
        </article>
    </section>
  )
}

export default TopAlbum