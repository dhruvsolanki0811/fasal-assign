import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/models/User";
import Playlist from "@/models/Playlist";
import { getServerSession } from "next-auth";
connectDB();

export async function POST(request:NextRequest) {
  // Connect to the database

  // Get the session
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the user from the session
  const user = await User.findOne({ email: session?.user?.email });
  if (!user) {
    return NextResponse.json({ error: "User not Logged In" }, { status: 404 });
  }

  // Parse the request body
  const { name, movies, isPublic } = await request.json();

  // Validate the request body
  if (!name || !Array.isArray(movies) || typeof isPublic !== 'boolean') {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }

  // Create a new playlist
  const playlist = new Playlist({
    name,
    movies,
    isPublic,
    user: user._id,
  });

  try {
    // Save the playlist
    await playlist.save();
    return NextResponse.json({ message: "Playlist created successfully", playlist }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create playlist", error: error }, { status: 500 });
  }
}


export async function GET(req:NextRequest) {
    try{
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    const playlists = await Playlist.find({ user: user._id }).populate("movies");
  
    return NextResponse.json({ playlists }, { status: 200 });
  }catch(error){
    return NextResponse.json({ message: "Failed to retrieve playlist", error: error }, { status: 500 });
  }
}