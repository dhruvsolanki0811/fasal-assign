import { Playlist, SearchShow, Show } from "@/types/types"
import { appendToBaseUrl } from "@/utils/utils"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

export const useFetchUsersPlaylists=()=>{
    const {data:session}=useSession()
    const fetchUsersPlaylists=async()=>{
      const response=await axios.get(appendToBaseUrl('/playlist'))
      const {playlists}:{playlists:Playlist[]}=await response.data
      return playlists
    }
    return useQuery({queryKey:["playlists",session?.user?.email],queryFn:fetchUsersPlaylists})
  }



export const useCreatePlaylist=()=>{
    const {data:session}=useSession()
    const createPlaylist=async({name,isPublic,movies}:{name:string,isPublic:Boolean,movies:Show[]})=>{
        try{
            const response= await axios.post(appendToBaseUrl('/playlist'),{
                name,isPublic,movies
            })
            return await response.data.playlist
        }
        catch(e){
            throw new Error("Some Error Occurer")
        }
    }
    const queryClient = useQueryClient();
    return useMutation({mutationKey:["Create Playlist"],mutationFn:createPlaylist,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["playlists",session?.user?.email]});
            toast.success("Playlist Created!");
      
        }
    })
}


export const useDeletePlaylist=()=>{
    const {data:session}=useSession()
    const deletePlaylist=async({playlistid}:{playlistid:string})=>{
        try{
            const response= await axios.delete(appendToBaseUrl(`/playlist/${playlistid}`))
            return await response.data.playlist
        }
        catch(e){
            throw new Error("Some Error Occurer")
        }
    }
    const queryClient = useQueryClient();
    return useMutation({mutationKey:["delete Playlist"],mutationFn:deletePlaylist,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["playlists",session?.user?.email]});
            toast.info("Playlist Deleted!");
      
        }
    })
}


export const useChangePlaylistStatus=()=>{
    const {data:session}=useSession()
    const [playlistId,setPlaylistId]=useState<string>("")
    const changePlaylistStatus=async({playlistid,isPublic}:{playlistid:string,isPublic:Boolean})=>{
        setPlaylistId(playlistid)
        try{
            await axios.patch(appendToBaseUrl(`/playlist/${playlistid}/status`),{isPublic})
        }
        catch(e){
            throw new Error("Some Error Occurer")
        }
    }
    const queryClient = useQueryClient();
    return useMutation({mutationKey:["change Playlist",playlistId   ],mutationFn:changePlaylistStatus,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["playlists",session?.user?.email]});
            toast.info("Playlist Status Changed!");
      
        }
    })
}


export const useFetchUsersPlaylistsByMovie=({movieId}:{movieId:string})=>{
    const {data:session}=useSession()
    const fetchUsersPlaylistsByMovie=async()=>{
      const response=await axios.get(appendToBaseUrl(`/playlist/movie/${movieId}`))
      const {playlists}:{playlists:{
        title: string,
        playlistId:string,
        hasMovie: boolean,
      }[]}=await response.data
      return playlists
    }
    return useQuery({queryKey:["playlists by movie",movieId,session?.user?.email],queryFn:fetchUsersPlaylistsByMovie})
  }



  export const useAddMovieToPlaylist=()=>{
    const {data:session}=useSession()
   const [movieId,setMovieId]= useState("")
    const addMovieToPlaylist=async({movie,playlistid}:{movie:SearchShow,playlistid:string})=>{
        setMovieId(movie.imdbID)
        try{
            await axios.post(appendToBaseUrl(`/playlist/${playlistid}/movies`),{movie:{imdbID:movie.imdbID,Year:movie.Year,Poster:movie.Poster,Title:movie.Title}})
            
        }
        catch(e){
            throw new Error("Some Error Occurer")
        }
    }
    const queryClient = useQueryClient();
    return useMutation({mutationKey:["Add to Playlist"],mutationFn:addMovieToPlaylist,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["playlists by movie",movieId,session?.user?.email]});
            queryClient.invalidateQueries({queryKey:["playlists",session?.user?.email]});
            toast.info("Movie Added to Playlist!");
        }
    })
}


export const useDeleteMovieToPlaylist=()=>{
    const {data:session}=useSession()
   const [movieId,setMovieId]= useState("")
    const deleteMovieToPlaylist=async({movie,playlistid}:{movie:SearchShow,playlistid:string})=>{
        setMovieId(movie.imdbID)
        try{
            await axios.delete(appendToBaseUrl(`/playlist/${playlistid}/movies/${movie.imdbID}`))
            
        }
        catch(e){
            throw new Error("Some Error Occurer")
        }
    }
    const queryClient = useQueryClient();
    return useMutation({mutationKey:["delete from Playlist"],mutationFn:deleteMovieToPlaylist,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["playlists by movie",movieId,session?.user?.email]});
            queryClient.invalidateQueries({queryKey:["playlists",session?.user?.email]});
            toast.info("Movie removed from Playlist!");
        }
    })
}
