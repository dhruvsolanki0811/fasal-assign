"use client";
import SearchGrid from "@/components/SearchGrid";
import placeholder from "@/assets/placeholder.jpg";
import empty from "@/assets/empty.jpg";
import {
  useDeleteMovieToPlaylist,
  useFetchMoviesByPlaylist,
} from "@/hooks/usePlaylistData";
import { useSearchStore } from "@/store/searchStore";
import React, { useEffect } from "react";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";

function PlaylistPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useFetchMoviesByPlaylist({
    playlistid: params.id,
  });
  const { query,setQuery,setShows } = useSearchStore();
  useEffect(()=>{
    setQuery("")
    setShows([])
  },[]) 
   const { data: session } = useSession();
  const { setShowId, setOpen } = useModalStore();
  const { mutate: removeFromPlaylist, isPending } = useDeleteMovieToPlaylist();
  if (query.length > 0) {
    return (
      <>
        <SearchGrid></SearchGrid>
      </>
    );
  }

  return (
    <>
      <div className="playlist-grid  flex flex-col justify-center flex-wrap mt-10 gap-y-6 gap-x-5 w-full">
        {isLoading || isPending ? (
          <Loader></Loader>
        ) : (
          data && (
            <>
              <div className="btn cursor-pointer  flex items-center gap-2 px-2 py-1 h-[2rem] rounded-[10px] text-[white]  flex justify-center items-center text-[17px] font-semibold">
                Movie Playlist - {data.name}
              </div>
              {data.movies.length == 0 ? (
                <div className="flex items-center justify-center  ">
                  <Image alt="" src={empty}></Image>
                </div>
              ) : (
                data.movies.map((show) => (
                  <div key={show.imdbID} className="flex items-center justify-center  ">
                    <>
                      <div
                        onClick={() => {
                          if (show.imdbID && show.imdbID.length > 0) {
                            setShowId(show.imdbID);
                            setOpen(true);
                          }
                        }}
                        className="card-container  rounded-[10px]  cursor-pointer shadow-[1px_1px_1px_1px_rgb(0,0,0,20%)]  h-[18rem] w-[13rem] overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out transform  transition-transform duration-300 ease-in-out transform"
                      >
                        <div className="img-container bg-black  relative h-[85%] overflow-hidden ">
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
                              className="object-fill w-full  h-full "
                            />
                          )}
                        </div>
                        <div className="playlist-detail   w-full h-[15%] overflow-hidden flex justify-between items-center  text-white pt-1 ps-2 pe-2 gap-2">
                          <div className="playlist-title ms-1 font-semibold cursor-pointer truncate ">
                            {show.Title}
                          </div>
                          {session && session.user?.email == data.user && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromPlaylist({
                                  movie: show,
                                  playlistid: params.id,
                                });
                              }}
                              className="playlist-dlt-icon me-[3px] border-white  p-1 border-solid cursor-pointer hover:bg-[white] hover:text-black"
                            >
                              <FaTrash />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  </div>
                ))
              )}
            </>
          )
        )}
      </div>
    </>
  );
}

export default PlaylistPage;
