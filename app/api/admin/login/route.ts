import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 },
    );
  }

  return NextResponse.json({ success: true });
}
