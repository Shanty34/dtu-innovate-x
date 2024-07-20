import mongoose from "mongoose";

const connectDB=async()=>{
  try {
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
    // console.log(`\n ${connectionInstance}`)
    console.log(`\n MongoDB Connected || DB HOST :${connectionInstance.connection.host}`)
  } catch (error) {
    console.error("MongoDB connection Error: ",error);
    process.exit(1)
  }
}

export default connectDB;