import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    messagee: String,
    createdAt: { type: Date, default: Date.now}
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);