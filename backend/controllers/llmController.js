import express from 'express';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GoogleGenerativeAI } from '@google/generative-ai';
const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-pro',
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});
const app = express();
const generateReadme = async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });
  try {
    const response = await llm.generateContent(code);
    const readmeContent = response.response.text();
    res.json({ msg: 'success', data: readmeContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Error generating README.' });
  }
};

const generateReadme2 = async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Write a story about a magic backpack.";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.json({ message: 'README generated successfully', content: result.response.text() });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Failed to generate README',
      reason: error.message
    });
  }
};
export { generateReadme,generateReadme2 };
