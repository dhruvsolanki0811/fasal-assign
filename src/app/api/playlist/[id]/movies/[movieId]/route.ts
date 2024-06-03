import Playlist from "@/models/Playlist";
import User from "@/models/User";
import { SearchShow } from "@/types/types";
import connectDB from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    id: string;
    movieId:string
  };
connectDB()
export async function DELETE(req:NextRequest,context:{params:Params}) {
    // Connect to the database
    
  
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
    const playlistId=context.params.id
    // Parse the request body
    const imdbID  = await context.params.movieId;
  
    // Validate the request body
    if (!playlistId || !imdbID) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
  
    // Find the playlist
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, {
  status: 404 });
  }
  
  // Check if the authenticated user is the owner of the playlist
  if (playlist.user.toString() !== user._id.toString()) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  // Remove the movie from the playlist
  playlist.movies = playlist.movies.filter((movie:SearchShow) => movie.imdbID !== imdbID);
  await playlist.save();
  
  // Return the updated playlist
  return NextResponse.json({ message: "Movie removed successfully", playlist }, { status: 200 });
  }