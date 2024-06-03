"use client";
import { Playlist } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdLock, MdOutlinePlaylistAdd, MdOutlinePublic } from "react-icons/md";
import placeholder from "@/assets/placeholder.jpg";
import { HiDotsVertical } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import { useChangePlaylistStatus, useDeletePlaylist } from "@/hooks/usePlaylistData";
import Loader from "./Loader";

function Playlistcard({ playlist }: { playlist: Playlist }) {
  const { mutate ,isPending} = useDeletePlaylist();
  const { mutate:changeStatus ,isPending:changingStatus} = useChangePlaylistStatus();

  const [ShowMenu, setShowMenu] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <div className="card-container relative rounded-[10px]  cursor-pointer shadow-[1px_1px_1px_1px_rgb(0,0,0,20%)]  h-[19rem] w-[13rem]  ">
        <div className="img-overlay  relative h-[16rem] overflow-hidden ">
          <div className="h-full w-full  absolute z-[100] bg-[#0000001a]"></div>
          <div className="absolute h-full w-[30%] flex flex-col text-white justify-center items-center ps-4 pe-4 bg-black bg-[#00000063] z-[500] right-[0]">
            <MdOutlinePlaylistAdd className="text-[2rem] bg-transparent cursor-pointer" />
            {playlist.movies.length}
          </div>
          {playlist.movies.length > 0 &&
          playlist.movies[0].Poster &&
          playlist.movies[0].Poster != "N/A" ? (
            <img
              //   src={"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"}
              src={playlist.movies[0].Poster}
              className="object-fill w-full  h-full "
            />
          ) : (
            <>
              <Image
                src={placeholder}
                alt="placeholder"
                fill
                className="object-none w-full h-full"
              />
            </>
          )}
        </div>{" "}
        <div className="playlist-detail relative  w-full h-[3rem] overflow-hidden flex justify-between items-center  text-white pt-1 ps-2 pe-2 gap-2">
          <div className="playlist-title ms-1 font-semibold cursor-pointer truncate ">
            {playlist.name}
          </div>
          <div
            onClick={() => {
              setShowMenu(true);
            }}
            className="playlist-dlt-icon me-[3px]  p-1 cursor-pointer "
          >
            <HiDotsVertical className="text-[20px]" />
          </div>
        </div>
        {ShowMenu && (
          <>
            <div
              ref={modalRef}
              className="show-menu flex flex-col gap-1 absolute z-[200000] bg-[var(--background)]  h-[4.5rem]  w-[10rem] rounded-[10px] bottom-[3.5rem] right-[0rem]"
            >
              <>
                <div
                  onClick={() => {
                    mutate({ playlistid: playlist._id });
                  }}
                  className="menu-items bg-[var(--background)] hover:bg-black ps-3 pt-2 pb-2 flex gap-2 items-center rounded-[6px] border-white border-[1px] border-solid"
                >
                  {isPending ? (
                    <Loader size="small"></Loader>
                  ) : (
                    <>
                      <BiTrash className="text-[1.2rem]" />
                      <div className="menu-text">Delete</div>
                    </>
                  )}
                </div>
                <div onClick={()=>{
                  changeStatus({playlistid:playlist._id,isPublic:!playlist.isPublic})
                }} className="menu-items bg-[var(--background)] hover:bg-black h-10 ps-3 pt-2 pb-2 flex gap-2 items-center border-white rounded-[6px] border-[1px] border-solid">
                  {changingStatus?
                    <Loader size="small"></Loader>
                  :<>{playlist.isPublic ? (
                    <MdOutlinePublic className="text-[1rem]" />
                  ) : (
                    <MdLock className="text-[1.2rem]" />
                  )}
                  <div className="menu-text">
                    {!playlist.isPublic ? "Private" : "Public"}
                  </div></>}
                </div>
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Playlistcard;
