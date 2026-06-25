import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

console.log("=================================");
console.log("🚀 MongoDB Connection Debug");
console.log("📍 MONGODB_URI:", MONGODB_URI);
console.log("=================================");

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
    console.log("✅ Using existing MongoDB connection");
    console.log("📊 Ready State:", mongoose.connection.readyState);
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Creating new MongoDB connection...");
    console.log("🔗 Connecting to:", MONGODB_URI);

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected Successfully");
        console.log("📂 Database:", mongooseInstance.connection.name);
        console.log("🌐 Host:", mongooseInstance.connection.host);
        console.log("🚪 Port:", mongooseInstance.connection.port);
        console.log("📊 Ready State:", mongooseInstance.connection.readyState);

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

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI");
// }

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = {
//     conn: null,
//     promise: null,
//   };
// }

// export async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//       maxPoolSize: 10,
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
