
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./'));

const HF_API_KEY = process.env.HF_API_KEY;

app.post("/gpt2", async (req, res) => {
  const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: req.body.prompt,
      parameters: {
        max_new_tokens: req.body.maxLength || 100,
        temperature: req.body.temperature || 0.7,
      },
    }),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, '0.0.0.0', () => {
  console.log("API running on port 3000");
});
