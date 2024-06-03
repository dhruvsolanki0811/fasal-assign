import Playlist from "@/models/Playlist";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

connectDB();

type Params = {
    id: string;
  };



  
export async function PATCH(req:NextRequest, context: { params: Params }) {
    try{
    const { id } = context.params;
    const playlistId=id
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
    const { isPublic } = await req.json();
  
    // Validate the request body
    if (!playlistId || typeof isPublic !== 'boolean') {
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
  
    // Update the isPublic property
    playlist.isPublic = isPublic;
    await playlist.save();
  
    // Return the updated playlist
    return NextResponse.json({ message: "Playlist visibility updated successfully", playlist }, { status: 200 });
  }
  catch(error){
    return NextResponse.json({ message: "Error Occured", error: error }, { status: 500 });
  }
}
  