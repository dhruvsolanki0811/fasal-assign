import Playlist from "@/models/Playlist";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

connectDB();
type Params = {
  id: string;
};
export async function DELETE(req: NextRequest, context: { params: Params }) {
  try {
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

    // Parse the request body
    const playlistId = context.params.id;

    // Validate the request body
    if (!playlistId) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Find the playlist
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    const playlistUser = await User.findOne({ _id:playlist.user });
    if (!playlistUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Check if the authenticated user is the owner of the playlist
    if (playlistUser.email !== user.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the playlist
    await Playlist.deleteOne({_id:playlist._id})

    // Return success response
    return NextResponse.json(
      { message: "Playlist deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Occurred", error: error },
      { status: 500 }
    );
  }
}
