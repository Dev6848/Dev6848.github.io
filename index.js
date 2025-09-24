// This is your server's code. It's the brain of your project.

// Step 1: Tell the server what tools it needs to use.
const express = require('express');
const app = express();
const { SpeechClient } = require('@google-cloud/speech');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const axios = require('axios'); // A tool to talk to other websites

// This tells your server to listen for requests and to read information sent to it.
app.use(express.json());
app.use(cors());

// You need to tell your server your API key.
// IMPORTANT: Replace 'YOUR_API_KEY_HERE' with the key you saved earlier.
const GEMINI_API_KEY = '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Step 2: Create a special "listening post" for your website.
// This is an API endpoint. Think of it as a specific URL where your website will send messages.
app.post('/api/converse', async (req, res) => {
    try {
        // Here's where we get the data from your website
        const { audioBase64, photoUrl, personaData } = req.body;

        // Step A: Transcribe the user's audio (Speech-to-Text)
        // We'll skip this for the hackathon to keep it simple and just use a placeholder text.
        const userText = "What was your favorite memory with me?"; 

        // Step B: Ask the AI (Gemini) for a response
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const personaPrompt = `You are a kind grandmother who loves gardening. The user asks: "${userText}". Respond as this person would.`;
        const result = await model.generateContent(personaPrompt);
        const aiResponse = await result.response.text();

        // Step C: Turn the AI's response into an audio file (Text-to-Speech)
        // We will create a fake audio file for simplicity and to save time.
        const audioUrl = "https://example.com/fake_audio.mp3"; 

        // Step D: Animate the avatar (SadTalker)
        // This is the tricky part. We are just pretending for the demo.
        // For a real project, you would send the photo and audio to your SadTalker notebook.
        // It would take a while to process.
        const videoUrl = "https://your-video-host.com/demo-video.mp4"; // This is a placeholder for your demo.

        // Step E: Send the final video link back to the website.
        res.json({ videoUrl: videoUrl });

    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
});

// This tells the server to start listening for messages.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});