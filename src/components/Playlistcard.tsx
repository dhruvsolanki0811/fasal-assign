import React from "react";
import { FaLock } from "react-icons/fa";
import { MdDelete, MdLockOpen, MdOutlinePlaylistAdd } from "react-icons/md";

function Playlistcard() {
  return (
    <>
      <div className="card-container   cursor-pointer shadow-[1px_1px_1px_1px_rgb(0,0,0,20%)]  h-[24rem]   w-[15rem] overflow-hidden">
        <div className="img-overlay  relative h-[21rem] overflow-hidden ">
         <div className="h-full w-full  absolute z-[100] bg-[#0000001a]"></div>
         <div className="absolute h-full w-[30%] flex flex-col text-white justify-center items-center ps-4 pe-4 bg-black bg-[rgba(0,0,0,0.45)] z-[500] right-[0]" >
          <MdOutlinePlaylistAdd className="text-[2rem] bg-transparent cursor-pointer" />
                2
          </div>
          <img
            //   src={"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"}
            src={
              "https://m.media-amazon.com/images/M/MV5BMGFjOGQ3MWItYzcwNS00ZTYxLWE5MmYtOWVkMWE1NmM1MzM1XkEyXkFqcGdeQXVyMTY1MjAwNDU0._V1_SX300.jpg"
            }
            className="object-fill w-full  h-full "
          />
          
        </div>{" "}
        
        <div className="playlist-detail   w-full h-[3rem] overflow-hidden flex justify-between items-center  text-white pt-1 ps-2 pe-2">
          <div className="playlist-title ms-1 font-semibold cursor-pointer truncate ">
            Lapaata Ladies for OscarLapaata Ladies for Oscar
          </div>
          <div className="playlist-dlt-icon me-[3px] border-white border-[1px] p-1 border-solid cursor-pointer hover:bg-white hover:text-black">
            <MdDelete className="text-[13px]" />
          </div>
          <div className="playlist-status-icon me-2 border-white border-[1px] p-1 border-solid cursor-pointer hover:bg-white hover:text-black ">
            <MdLockOpen className="text-[13px]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Playlistcard;
