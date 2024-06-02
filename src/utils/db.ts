import mongoose from "mongoose";

const connectDB = () => {
  // Dont connect to DB if already connected
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  // Connect to DB
  if(process.env.MONGO_URI){
  mongoose.connect(process.env.MONGO_URI);}
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });
};

export default connectDB;