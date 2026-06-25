import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    email: String,
    phone: String,
    industry: String,
    product: String,
    message: String,
  },
  { timestamps: true },
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
