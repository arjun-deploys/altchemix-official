import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const { username, password } = body;

    const admin = await Admin.findOne({ username, password });

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

    return NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
      },
    });
  } catch (error) {
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
