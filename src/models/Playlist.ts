import mongoose from "mongoose";


const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    movies: [{
      imdbID: {
        type: String,
        required: true,
      },
      Title: {
        type: String,
        required: true,
      },
      Poster: {
        type: String,
        required: false,
      },
      Year: {
        type: String,
        required: false,
      },
    }],
    isPublic: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.models.playlists || mongoose.model("playlists", playlistSchema);

export default Playlist;
