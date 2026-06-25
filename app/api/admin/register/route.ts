import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { username, password, name, emailNotification } = await req.json();

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 },
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 409 },
      );
    }

    // Create admin
    const admin = await Admin.create({
      username,
      password,
      name,
      emailNotification,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully",
        admin: {
          id: admin._id,
          username: admin.username,
          name: admin.name,
          emailNotification: admin.emailNotification,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

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

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Register API is working, but not implemented yet",
  });
}
