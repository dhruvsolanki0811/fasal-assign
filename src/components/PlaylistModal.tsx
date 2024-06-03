"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "./Loader";
import {
  useAddMovieToPlaylist,
  useCreatePlaylist,
  useDeleteMovieToPlaylist,
  useFetchUsersPlaylistsByMovie,
} from "@/hooks/usePlaylistData";
import { SearchShow } from "@/types/types";

function PlaylistModal({
  closeModal,
  movie,
}: {
  closeModal: () => void;
  movie: SearchShow;
}) {
  const [name, setName] = useState("");
  const { mutate, isPending, isSuccess } = useCreatePlaylist();
  const {
    data: playlists,
    isLoading: playlistLoading,
    refetch,
  } = useFetchUsersPlaylistsByMovie({ movieId: movie.imdbID });
  const { mutate: addToPlaylist, isPending: isAdding } =
    useAddMovieToPlaylist();
  const { mutate: deleteFromPlaylist, isPending: isDeleting } =
    useDeleteMovieToPlaylist();
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleCheckBox = (checked: boolean, Playid: string) => {
    if (!checked && movie.imdbID) {
      deleteFromPlaylist({ movie: movie, playlistid: Playid });
    } else if (checked && movie.imdbID) {
      addToPlaylist({ movie: movie, playlistid: Playid });
    }
  };
  return (
    <>
      <div className="blur-screen fixed  bg-[rgb(0,0,0,20%)] inset-0  z-[50000] flex justify-center items-center">
        <div
          ref={modalRef}
          className="add-playlist-container flex flex-col gap-2 py-7 px-6 relative z-[20000] max-sm:w-full  h-[max-content] w-[25rem] ms-[1rem] me-[1rem] bg-[var(--background)]"
        >
          <div className="flex  icon-box justify-between  w-full">
            <span className="text-[17px]"> Save to... </span>
            <AiOutlineCloseCircle
              className="icon text-[25px] cursor-pointer"
              onClick={() => closeModal()}
            />{" "}
          </div>
          <div className="playlist-list  flex flex-col gap-1">
            {playlistLoading || isAdding || isDeleting ? (
              <Loader size="small"></Loader>
            ) : (
              playlists &&
              playlists.map((playlist) => (
                <div className="li-items flex gap-3">
                  <input
                    type="checkbox"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleCheckBox(e.target.checked, playlist.playlistId)
                    }
                    checked={playlist.hasMovie}
                  />

                  <div className="text truncate text-white  text-[16px] ">
                    {playlist.title}
                  </div>
                </div>
              ))
            )}
          </div>
          <form
            method="POST"
            onSubmit={async (e: FormEvent) => {
              e.preventDefault();
              mutate({ name: name, isPublic: false, movies: [] });

              setName("");
            }}
            className="create-playlist-form flex flex-col gap-3"
          >
            <input
              type="text"
              name="Name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
              className="playlist-input mt-3 text-[17px] border-b-[1px] border-b-[1px] border-b-white bg-transparent w-full text-white p-1 outline-none"
              required
              placeholder="Enter Playlist Name"
            />
            <div>
              {!isPending ? (
                <button
                  type="submit"
                  className="px-3  h-[2rem] rounded-[10px] bg-[var(--netflix-font-red)] mt-2 text-white flex justify-center items-center text-[17px] font-semibold"
                >
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

export default PlaylistModal;
