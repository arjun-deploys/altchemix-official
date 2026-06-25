import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

// CREATE
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const contact = await Contact.create(body);

  // Send email notification
  await resend.emails.send({
    from: "onboarding@resend.dev", // required for free tier
    to: "arjun2k17@gmail.com", // client email
    subject: "New Website Enquiry from Altchemix",
    html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Industry:</strong> ${body.industry}</p>
        <p><strong>Product:</strong> ${body.product}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
  });

  return NextResponse.json(contact, { status: 201 });
}

// READ
export async function GET() {
  await dbConnect();
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json(contacts);
}

// UPDATE
export async function PUT(req: Request) {
  await dbConnect();
  const { id, ...data } = await req.json();

  const updated = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();

  await Contact.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
