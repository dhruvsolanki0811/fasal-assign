"use client";
import AddToPlaylistCard from "@/components/AddToPlaylistCard";
import Loader from "@/components/Loader";
import Playlistcard from "@/components/Playlistcard";
import SearchGrid from "@/components/SearchGrid";
import { useFetchUsersPlaylists } from "@/hooks/usePlaylistData";
import { useSearchStore } from "@/store/searchStore";
import { trusted } from "mongoose";
import { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";

export default function Home() {
  const { query } = useSearchStore();
  const [addPlaylistModalOpen,setAddPlaylistModalOpen]=useState(false)
  
  const { data: playlists, isLoading } = useFetchUsersPlaylists();
 
  if (query.length > 0) {
    return (
      <>
        <SearchGrid></SearchGrid>
      </>
    );
  }
  return (
    <>
      
      {addPlaylistModalOpen && <AddToPlaylistCard closeAddPlaylistModalOpen={()=>setAddPlaylistModalOpen(false)}/>}
      <div className="content-wrapper px-[2.4rem] my-7">
        <div className="header  flex justify-center items-center gap-2 font-[600] text-[1.2rem] flex justify-center ">
          <div onClick={()=>{setAddPlaylistModalOpen(true)}} className="btn cursor-pointer hover:bg-[#c61414] flex items-center gap-2 px-2 py-1 h-[2rem] rounded-[10px] bg-[var(--netflix-font-red)] mt-2 text-white flex justify-center items-center text-[17px] font-semibold">
            Add Playlist <CgAdd></CgAdd>
          </div>
        </div>

        <div className="list-grid flex justify-center flex-wrap mt-6 gap-y-10 gap-x-5 w-full">
          {isLoading?
            <Loader></Loader>
          :playlists &&playlists.map((playlist) => (
            <Playlistcard playlist={playlist} key={playlist._id}></Playlistcard>
          ))}
        </div>
      </div>
    </>
  );
}
