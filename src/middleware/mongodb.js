import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.DATABASE_ACCESS, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connected");
    }
  });
  return handler(req, res);
};

export default connectDB;
