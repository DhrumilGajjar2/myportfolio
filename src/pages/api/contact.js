export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method Not Allowed'});
    }

    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        return res.status(400).json({error: 'ALl fields are required.'});
    }

    console.log('New Contact Form Submission:', { name, email, message});

    return res.status(200).json({success: true, message: 'your message has been received successfully!'});
}