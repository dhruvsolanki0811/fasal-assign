'use client'
import {SearchShow } from "@/types/types";
import React from "react";
import placeholder from "@/assets/placeholder.jpg"
import Image from "next/image";
import { useModalStore } from "@/store/modalStore";
function SearchImageCard({show}:{show:SearchShow}) {
  const {setShowId,setOpen}=useModalStore()
  return (
    <>
      <div 
      onClick={()=>{
        if(show.imdbID && show.imdbID.length>0){
        setShowId(show.imdbID)
        setOpen(true)
        }
      }}
      className="card-container  rounded-[10px]  cursor-pointer shadow-[1px_1px_1px_1px_rgb(0,0,0,20%)]  h-[18rem] w-[13rem] overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out transform  transition-transform duration-300 ease-in-out transform">
        <div className="img-container bg-black  relative h-[85%] overflow-hidden ">
          {!show.Poster|| show.Poster=='N/A'
          ?
          <Image
          src={placeholder}
          alt="placeholder"
          fill
          className="object-none w-full h-full"
        />:
        <img
            //   src={"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"}
            src={show.Poster}
            className="object-fill w-full  h-full "
          />
          }
        </div>
        <div className="playlist-detail   w-full h-[15%] overflow-hidden flex justify-between items-center  text-white pt-1 ps-2 pe-2 gap-2">
          <div className="playlist-title ms-1 font-semibold cursor-pointer truncate ">
            {show.Title}
          </div>
          <div className="playlist-dlt-icon me-[3px] border-white  p-1 border-solid cursor-pointer hover:bg-white hover:text-black">
            {show.Year?.substring(0,4)}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchImageCard;
