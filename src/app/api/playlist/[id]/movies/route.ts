import { NextRequest, NextResponse } from "next/server";

import { Show } from "@/types/types";
// Adjust the import path as necessary
import Playlist from "@/models/Playlist";
import connectDB from "@/utils/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
connectDB();

type Params = {
  id: string;
};
export async function GET(req: NextRequest, context: { params: Params }) {
  // Connect to the database
  try {
    const { id } = context.params;

    // Get the playlist by ID
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    // Check if the playlist is public
    if (playlist.isPublic) {
      return NextResponse.json({ movies: playlist.movies }, { status: 200 });
    }

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

    // Check if the requested user is the owner of the playlist
    if (playlist.user.email !== user.email) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 403 });
    }

    // Return the movies if the user is the owner of the playlist
    return NextResponse.json({ movies: playlist.movies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create playlist", error: error },
      { status: 500 }
    );
  }
}


export async function POST(req:NextRequest,context:{params:Params}) {
    try{
    const id= context.params.id
    
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
  
    // Parse the request body
    const {  movie } = await req.json();
    const playlistId=id
    // Validate the request body
    if (!playlistId || !movie || !movie.imdbID || !movie.Title || !movie.Poster || !movie.Year) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
  
    // Find the playlist
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }
  
    // Check if the authenticated user is the owner of the playlist
    if (playlist.user.toString() !== user._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    // Add the movie to the playlist
    
    playlist.movies.push(movie );
    await playlist.save();
  
    // Return the updated playlist
    return NextResponse.json({ message: "Movie added successfully", playlist }, { status: 200 });
  }
  catch(error){
    return NextResponse.json({ message: "Error Occurred", error: error }, { status: 500 });
  }
}


