const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


const promptSchema = new mongoose.Schema({
  prompt: String,
  response: String,
  createdAt: { type: Date, default: Date.now },
});
const Prompt = mongoose.model("Prompt", promptSchema);


app.post("/api/ask-ai", async (req, res) => {
  const { prompt } = req.body;
  try {
    const aiRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-pro-exp-03-25:free",
        messages: [{ role: "user", content: prompt }],
        provider: { ignore: ["Venice"] },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "FutureBlink Assignment",
        },
      }
    );
    const answer = aiRes.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.json({ answer: `[Demo] You asked: "${prompt}" — AI response would appear here.` });
  }
});


app.post("/api/save", async (req, res) => {
  const { prompt, response } = req.body;
  try {
    const doc = await Prompt.create({ prompt, response });
    res.json({ success: true, doc });
  } catch (err) {
    res.status(500).json({ error: "Save failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

