import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined");
  throw new Error("Please define MONGODB_URI");
}

let cached = (global as any).mongoose;

if (!cached) {
  console.log("🆕 Creating mongoose cache");
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function dbConnect() {
  console.log("🔄 dbConnect() called");

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Failed");
        console.error("Error:", error);
        throw error;
      });
  } else {
    console.log("⌛ Waiting for existing connection promise...");
  }

  cached.conn = await cached.promise;

  console.log("🎉 MongoDB connection ready");
  return cached.conn;
}
