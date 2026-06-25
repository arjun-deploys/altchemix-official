import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Resend } from "resend";
import { AdminNotificationEmail } from "@/lib/emails/AdminNotificationEmail";
import { ThankYouEmail } from "@/lib/emails/ThankYouEmail";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

// CREATE
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, company, email, phone, industry, product, message } = body;

    const receivedAt = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    await Contact.create(body);

    await Promise.all([
      // Admin notification
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: "info@altchemix.com",
        subject: `🚀 New Enquiry — ${name} from ${company}`,
        html: AdminNotificationEmail({
          name,
          company,
          email,
          phone,
          industry,
          product,
          message,
          receivedAt,
        }),
      }),
      // Customer thank-you
      resend.emails.send({
        from: "info@altchemix.com",
        to: email,
        subject: `We've received your enquiry ✔ — Altchemix`,
        html: ThankYouEmail({
          name,
          company,
          email,
          phone,
          industry,
          product,
          message,
        }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

// READ — supports ?status=&industry=&product= query params
export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const industry = searchParams.get("industry");
  const product = searchParams.get("product");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};
  if (status) filter.status = status;
  if (industry) filter.industry = industry;
  if (product) filter.product = product;

  const contacts = await Contact.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(contacts);
}

// UPDATE (full update)
export async function PUT(req: Request) {
  await dbConnect();
  const { id, ...data } = await req.json();

  const updated = await Contact.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

// PATCH — partial update (status, notes)
export async function PATCH(req: Request) {
  await dbConnect();
  const { id, ...fields } = await req.json();

  const updated = await Contact.findByIdAndUpdate(
    id,
    { $set: fields },
    { new: true },
  );
  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();

  await Contact.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
