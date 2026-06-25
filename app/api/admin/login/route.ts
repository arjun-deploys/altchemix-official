// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/mongodb";
// import Admin from "@/models/Admin";

// export async function POST(req: Request) {
//   await dbConnect();

//   const { username, password } = await req.json();

//   const admin = await Admin.findOne({ username, password });

//   if (!admin) {
//     return NextResponse.json(
//       { success: false, message: "Invalid credentials" },
//       { status: 401 },
//     );
//   }

//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    console.log("=================================");
    console.log("🔐 LOGIN REQUEST STARTED");
    console.log("🕒 Time:", new Date().toISOString());
    console.log("=================================");

    console.log("📡 Connecting to database...");
    await dbConnect();
    console.log("✅ Database connected");

    const body = await req.json();

    console.log("📥 Request Body:", {
      username: body.username,
      password: body.password ? "***PROVIDED***" : "MISSING",
    });

    const { username, password } = body;

    console.log("🔍 Searching admin...");
    console.log("Query:", {
      username,
      password: "***MASKED***",
    });

    const totalAdmins = await Admin.countDocuments();
    console.log("📊 Total Admins:", totalAdmins);

    const allAdmins = await Admin.find({}).lean();
    console.log(
      "👥 Admin Users:",
      allAdmins.map((a) => ({
        id: a._id,
        username: a.username,
      })),
    );

    const admin = await Admin.findOne({ username, password });

    console.log("📊 Query Result:", admin ? "FOUND" : "NOT FOUND");

    if (!admin) {
      console.log("❌ Invalid credentials");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    console.log("✅ Login successful");
    console.log("👤 Admin Details:", {
      id: admin._id,
      username: admin.username,
      name: admin.name,
    });

    return NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("=================================");
    console.error("💥 LOGIN ERROR");
    console.error(error);
    console.error("=================================");

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
