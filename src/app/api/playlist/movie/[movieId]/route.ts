import Playlist from "@/models/Playlist";
import User from "@/models/User";
import { Show } from "@/types/types";
import connectDB from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

connectDB()

type Params = {
    movieId: string;
};

export async function GET(req:NextRequest,context:{params:Params}) {
    try{
    
    // Get the session
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    // Get the user from the session
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    // Get the movie ID from the query parameters
    const movieId =context.params.movieId ;
    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }
  
    // Fetch all playlists of the authenticated user
    const playlists = await Playlist.find({ user: user._id }).select("name movies");
  
    // Check if each playlist contains the specified movie and prepare the response
    const response = playlists.map(playlist => ({
      title: playlist.name,
      playlistId:playlist._id,
      hasMovie: playlist.movies.some((movie:Show) => movie.imdbID === movieId),
    }));
  
    // Return the response
    return NextResponse.json({ playlists: response }, { status: 200 });
  }
  catch(error){
    return NextResponse.json({ message: "Error Occurred", error: error }, { status: 500 });

  }
}