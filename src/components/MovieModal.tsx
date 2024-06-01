"use client";
import { useFetchShowByImdbId } from "@/hooks/useShowData";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import placeholder from "@/assets/placeholder.jpg";
import Loader from "./Loader";

function MovieModal() {
  const { setOpen, setShowId } = useModalStore();
  const { data: show, isLoading } = useFetchShowByImdbId();
  
  return (
    <>
      <div className="trailer-modal fixed  bg-[rgb(0,0,0,60%)] inset-0  z-[10000] flex justify-center items-center">
        <div className="trailer-container   relative aspect-video max-sm:w-full  h-[40rem] w-[55vw] ms-[1rem] me-[1rem] bg-[var(--background)]">
          {isLoading
            ? 
            <div className="load-overlay relative flex justify-center h-[70%] overflow-hidden bg-[black]">
            <Loader/>
            </div>   
            : show && (
                <>
                  <div className="img-overlay relative h-[70%] overflow-hidden bg-[black]">
                    <div className="black-shade  absolute inset-0 z-[20000]  w-full h-[100%] bg-black/3 bg-gradient-to-b from-neutral-900/10 to-neutral-900"></div>
                    <div className="btn-container grid grid-rows-2 absolute z-[20000] top-0 w-full h-full ">
                      <div className="close-btn-container  flex justify-end items-start pt-7 pe-4 ">
                        <div
                          //   ref={closeRef}
                          onClick={() => {
                            setOpen(false);
                            setShowId("");
                          }}
                          className="play-btn cursor-pointer text-[17px] rounded-full flex p-1  gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[10px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white"
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                      <div className="grid p-[1rem] ">
                        <div className="btn-container self-end	">
                          <div className="banner-play flex justify-between items-center  gap-1">
                            <div className="play-btn-container flex gap-2">
                              <div className="play-btn cursor-pointer text-[14px] flex pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-white  border-[1px] border-solid border-[white] rounded-[3px] hover:bg-[var(--border-btn)] hover:border-[var(--border-btn)] hover:text-white">
                                {true ? (
                                  <>
                                    <FaPlay className="text-[13px]"></FaPlay>
                                    Add to List
                                  </>
                                ) : (
                                  <>
                                    <FaPause className="text-[13px]"></FaPause>
                                    Pause
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    

                    {!show.Poster || show.Poster == "N/A" ? (
                      <Image
                        src={placeholder}
                        alt="placeholder"
                        fill
                        className="object-none w-full h-full"
                      />
                    ) : (
                      <img
                        //   src={"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"}
                        src={show.Poster}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="desc-wrapper mt-1 px-3  flex flex-col gap-2">
                    <h2 className="movie-title text-[1.4rem] text-white font-extrabold truncate  ">
                      {show.Title}
                    </h2>

                    <div className="popularity-tab flex flex-nowrap	 gap-2  items-center">
                      <div className="popularity text-[#16A34A] text-[0.8rem] font-medium	 ">
                        {show.imdbRating} Ratings
                      </div>
                      <div className="popularity text-[0.8rem] font-medium">
                        {show.Released}
                      </div>
                      <div className="runtine text-[0.8rem] font-medium">
                        {show.Runtime}
                      </div>
                    </div>
                    <div className="genre text-[0.8rem] font-medium">
                      {show.Genre}
                    </div>
                    <div className="movie-title text-[13px] text-justify multi-line-ellipsis">
                      {show.Plot}
                    </div>
                  </div>
                </>
              )}
        </div>
      </div>
    </>
  );
}

export default MovieModal;
