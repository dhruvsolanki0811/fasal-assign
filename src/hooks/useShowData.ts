import { useModalStore } from "@/store/modalStore";
import { useSearchStore } from "@/store/searchStore";
import { SearchShow, Show } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchShowByImdbId=()=>{
  const {showId}= useModalStore()
  const fetchShowByImdbId=async()=>{
    const response=await axios.get(`https://www.omdbapi.com/?i=${showId}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`)
    const show:Show=await response.data
    return show
  }
  return useQuery({queryKey:[`${showId}`],queryFn:fetchShowByImdbId,enabled:!!showId})
}

export const useSearchShow = () => {
  const { query } = useSearchStore();
  const searchQuery = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&page=1&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );

      const searchResult: { Search: SearchShow[] } =await response.data;
      return searchResult.Search;
    } catch (error) {
      throw new Error("Failed to fetch trending movies");
    }
  };

  return useQuery({ queryKey: ["search", query], queryFn: searchQuery , enabled: false });
};
