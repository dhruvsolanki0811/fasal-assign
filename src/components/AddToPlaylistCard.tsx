'use client'
import { useCreatePlaylist } from "@/hooks/usePlaylistData";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "./Loader";

function AddToPlaylistCard({closeAddPlaylistModalOpen}:{closeAddPlaylistModalOpen:()=>void}) {
    const  [name,setName]= useState("");
    const {mutate,isPending}=useCreatePlaylist()
    return (
    <>
      <div className="blur-screen fixed  bg-[rgb(0,0,0,20%)] inset-0  z-[10000] flex justify-center items-center">
      <div className="add-playlist-container flex flex-col gap-2 py-7 px-6 relative z-[20000] max-sm:w-full  h-[max-content] w-[25rem] ms-[1rem] me-[1rem] bg-[var(--background)]">
      <li className="flex  icon-box justify-between  w-full">
          <span className="text-[17px]"> Create Playlist... </span>
          <AiOutlineCloseCircle
            className="icon text-[25px] "
            onClick={() => closeAddPlaylistModalOpen()}
          />
        </li>
        <form
        method="POST"
          onSubmit={(e:FormEvent) =>{
            e.preventDefault()
            mutate({name:name,isPublic:false,movies:[]})
            setName("")
          }}
          className="create-playlist-form flex flex-col gap-3"
        >
          
            
          
          <input
            type="text"
            name="Name"
            value={name}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setName(e.target.value)
            }}
            className="playlist-input mt-3 text-[17px] border-b-[1px] border-b-[1px] border-b-white bg-transparent w-full text-white p-1 outline-none"
            required
            placeholder="Enter Playlist Name"
          />
          <div>
          {!isPending ? (
            <button type="submit" className="px-3  h-[2rem] rounded-[10px] bg-[var(--netflix-font-red)] mt-2 text-white flex justify-center items-center text-[17px] font-semibold">
              Create
            </button>
          ) : (
            <div className="mt-2">
            <Loader></Loader>
            </div>
          )}
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default AddToPlaylistCard;
