import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../utilities/Spinner';
import { addDoc, collection } from 'firebase/firestore';
import { __DB } from '../backend/firebase';

const CreateAlbum = () => {
    let intialAlbumState ={
        albumTitle:"",
        albumPoster:"",
        albumReleaseDate:"",
        albumLanguages:"",
        albumDescription:""
    }
    let intialSongState = {
        songName:"",
        songUrl:"",
        songThumbnail:"",
        songSingers:"",
        songMood:"",
        songMusicDirector:""
    }
    let [albumState,setAlbumState]=useState(intialAlbumState);
    let [songsState,setSongState]=useState([intialSongState]);
    let [isLoading,setIsLoading]=useState(false);
    let [albumThumbnailPoster,setAlbumThumbnailPoster]=useState(null);
    let {albumTitle,albumPoster,albumReleaseDate,albumLanguages,albumDescription}=albumState;


    // handling album {poater}
    let handleAlbumPoster=(e)=>{
        let file =e.target.files[0];
        if(file){
            setAlbumThumbnailPoster(file)
                
            
        }
    }

    // handling input changes in album form

    let handleAlbumInputChange=(e)=>{
        let {name,value}=e.target;

        setAlbumState({
            ...albumState,[name]:value
        })
    }
    // add section method for song

    let addSongSection=(e)=>{
        e.preventDefault();
        setSongState([
            ...songsState,{
                songName:"",
                songUrl:"",
                songThumbnail:"",
                songSingers:"",
                songMood:"",
                songMusicDirector:""

            }
        ])
    }
    // remove song section

    let removeSongSection=(index,e)=>{
        e.preventDefault();
        if(index>0){

        setSongState(songsState.filter((el,ind)=>{
            return ind !=index;

        }))
    }
    }
    // handling the songs input

    let handleSongsInputChange=(index,e)=>{
        let {name,value}=e.target;
        let updatedState = [...songsState];
        updatedState[index][name]=value;
        setSongState(updatedState);
    }

    // handling files of song section

    let handleSongsFilesInput=(index,inpName,e)=>{
        let updatedSongs = [...songsState];
        updatedSongs[index][inpName]=e.target.files[0];
        setSongState(updatedSongs);
    }

    // form submit method

    let handleFormSubmit=async(e)=>{
        e.preventDefault();
        // console.log(albumState);
        // console.log(albumThumbnailPoster);
        
        try {
            setIsLoading(true);


            let AlbumPosterFormData=new FormData();
            AlbumPosterFormData.append("file",albumThumbnailPoster);
            AlbumPosterFormData.append("upload_preset","tech_haven_music_382");
            AlbumPosterFormData.append("cloud_name","dqisyrqnc")

            let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/dqisyrqnc/image/upload",{
                method:"POST",
                body:AlbumPosterFormData
              })
              let AlbumPosterUrlFromDB=await(await cloudinaryResponse).json()
            //   console.log(AlbumPosterUrlFromDB);

            //   let Payload={...albumState,albumPoster:AlbumPosterUrlFromDB?.url}
            //   console.log(Payload);

              let SongsUrl=songsState.map(async(song,index)=>{
                let songThumbnailFormData=new FormData();
                songThumbnailFormData.append("file",song?.songThumbnail );
                songThumbnailFormData.append("upload_preset","tech_haven_music_382");
               songThumbnailFormData.append("cloud_name","dqisyrqnc")

               let cloudinaryResponseOfSongThumbnailData = fetch("https://api.cloudinary.com/v1_1/dqisyrqnc/upload",{
                method:"POST",
                body:songThumbnailFormData
              })
             
              let songPosterUrlFromDB=await(await cloudinaryResponseOfSongThumbnailData ).json()
            //   console.log(songPosterUrlFromDB);
              
              

            //  *songposter url ends here


// songurl stARTS Here
           let songURLFormdata=new FormData();
            songURLFormdata.append("file",song?.songUrl );
            songURLFormdata.append("upload_preset","tech_haven_music_382");
           songURLFormdata.append("cloud_name","dqisyrqnc")

           let cloudinaryResponseOfSongURLData = fetch("https://api.cloudinary.com/v1_1/dqisyrqnc/upload",{
            method:"POST",
            body:songURLFormdata
          })
         
          let songMP3UrlFromDB=await(await cloudinaryResponseOfSongURLData).json()
        //   console.log(songMP3UrlFromDB);

        //   console.log("songMP3 URL",songMP3UrlFromDB);
        //   console.log("songPoster URL",songPosterUrlFromDB);

        return ({...song,songThumbnail:songPosterUrlFromDB?.url,songPosterUrlFromDB,songUrl:songMP3UrlFromDB?.url,songDuration:songMP3UrlFromDB?.duration})
          
          

            //    song state iterating ends here
    

              })



              let SongsDataFromCloudinayResponse=await Promise.all(SongsUrl);
              let Payload={...albumState,
                albumPoster:AlbumPosterUrlFromDB?.url, AllSongs:[...SongsDataFromCloudinayResponse]}
                console.log("last cheacking payload",Payload);


                let album_collection_ref=collection(__DB,"album_collections");
                let albumDataForDB=await addDoc(album_collection_ref,Payload)
                toast.success("data stored successfully")
                




console.log("Album poster",AlbumPosterUrlFromDB?.url);






            // let Payload={...albumState,
            //     albumPoster:AlbumPosterUrlFromDB?.url, AllSongs:[...SongsDataFromCloudinayResponse]}
            //     console.log("last cheacking payload",Payload);
                
              
              
            
        } catch (error){
        toast.error(error.message)
        
        console.log(error);
        
            
         
            
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <section className='h-full w-full flex justify-center  '>
        <article className='min-h-[400px] w-[65%] bg-slate-800 rounded-md mt-12 pt-4 px-8'>
            <header><h1 className='text-[24px] font-semibold text-center'>Create Album</h1> </header>
            <hr className='my-2'/>
            {/* form starting here */}
            <main>
                {/* album form starting */}
                <header className='my-4'>
                    <h1 className='text-[20px] font-semibold'>Album Details</h1>

                </header>
                <article>
                    <form action="" onSubmit={handleFormSubmit}>
                        {/* album starts */}
                        <header className='flex flex-wrap justify-between gap-y-4'>
                            {/* first row album */}
                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumTitle">Album Title</label>
                                <input type="text" placeholder='Enter Album Title ' value={albumTitle} onChange={handleAlbumInputChange} name='albumTitle' className='outline-none py-2 px-2 border rounded-md' />
                            </div>
                            
                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumTitle">Album Poster</label>
                                <input type="file"  name='albumPoster'onChange={handleAlbumPoster} className='outline-none py-2 px-2 border rounded-md file:bg-blue-600 file:px-1 file:rounded-sm' />
                            </div>
                            {/* second row album */}
                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumTitle">Album Release Date</label>
                                <input type="date" name='albumReleaseDate' value={albumReleaseDate} onChange={handleAlbumInputChange} className='outline-none py-2 px-2 border rounded-md' />
                            </div>

                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumLanguages">Album Languages</label>
                                <input type="text" name='albumLanguages' placeholder='Enter Languages ' value={albumLanguages} onChange={handleAlbumInputChange} className='outline-none py-2 px-2 border rounded-md' />
                            </div>
                            {/* third row album */}
                            <div className='flex flex-col gap-2 w-[100%]'>
                                <label htmlFor="albumTitle">Album Title</label>
                                <textarea className='py-2 px-2 border rounded-md ' value={albumDescription} placeholder='Enter the Description' onChange={handleAlbumInputChange} name='albumDescription'></textarea>
                            </div>



                        </header>
                        {/* album ends */}
                        {/* songs form starts here */}
                        <main className='py-4'>
                            <header>
                                <h1 className='text-[20px] font-semibold'>Songs Section</h1>
                            </header>
                            {/* iterating the song state */}
                            {songsState?.map((song,index)=>{
                                return <section className='bg-slate-700 w-[100%] min-h-[250px] rounded-md my-4 py-2 px-6'>
                                    <header>
                                        <h1 className='text-[18px] font-semibold text-center'>Song {index+1}</h1>
                                    </header>
                                    {/* this is songs divs Section */}
                                    <main className='flex justify-between flex-wrap gap-y-4'>
                                        {/* first row songs section */}
                                        <div className='flex flex-col gap-2 w-[32%]'>
                                            <label htmlFor="">Song Name</label>
                                            <input type="text" name='songName' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songName} className='outline-none border py-2 px-2 rounded-md' placeholder='Enter Song name' />
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%]'>
                                            <label htmlFor="">Song Url</label>
                                            <input type="file" onChange={(e)=>handleSongsFilesInput(index,"songUrl",e)}   className='outline-none border py-2 px-2 rounded-md file:bg-blue-600 file:px-1 file:rounded-md' name='songUrl' />
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%]'>
                                            <label htmlFor="">Song Poster</label>
                                            <input type="file" className='outline-none border py-2 px-2 rounded-md' name='songThumbnail' onChange={(e)=>handleSongsFilesInput(index,"songThumbnail",e)} />
                                        </div>

                                        {/* second row songs section */}
                                        <div className='flex flex-col gap-2 w-[32%]'>
                                            <label htmlFor="">Song Singers</label>
                                            <input type="text" className='outline-none border py-2 px-2 rounded-md' name='songSingers' placeholder='Enter Singers' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songSingers} />
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%]'>
                                            <label htmlFor="">Song Mood</label>
                                            <input type="text" className='outline-none border py-2 px-2 rounded-md' placeholder='Enter Song mood' name='songMood' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songMood} />
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%]'>
                                            <label htmlFor="">Song Music Director</label>
                                            <input type="text" className='outline-none border py-2 px-2 rounded-md' placeholder='Enter music Director' name='songMusicDirector'  onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songMusicDirector}/>
                                        </div>
                                    </main>
                                    <footer className='flex justify-between py-6'>
                                        <button className='py-2 px-4 bg-red-600 rounded-md' onClick={(e)=>removeSongSection(index,e)}>Remove Section</button>
                                        {index ==songsState.length-1 && <button onClick={addSongSection} className='py-2 px-4 bg-blue-600 rounded-md'>Add Section</button>}
                                        
                                    </footer>

                                </section>


                            })}
                            <section>

                            </section>
                        </main>
                        {/* songs form ends here */}


                        {/* submit part starts */}
                        <footer>
                            <button className='bg-blue-600 hover:bg-blue-800 w-[100%] py-2 rounded-md '>Submit</button>
                        </footer>
                        {/* Submit part ends */}
                    </form>

                </article>
                {/* album form ending */}
            </main>
            {/* form ending here */}
           
            

        </article>
        {isLoading && <Spinner/>}
    </section>
  )
}

export default CreateAlbum