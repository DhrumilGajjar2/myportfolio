// pages/api/contact.js

import dbConnect from "../../../lib/mongodb";
import Contact from "../../../models/Contact";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await dbConnect();

    const contact = await Contact.create({ name, email, message });

    console.log('New Contact Form Submission:', contact);

    return res.status(201).json({
      success: true,
      message: 'Your message has been received successfully!',
      data: contact,
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
