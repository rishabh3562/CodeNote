import express from 'express';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GoogleGenerativeAI } from '@google/generative-ai';
const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-pro',
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});
import cors from 'cors';
const app = express();
app.use(express.json());
// app.options('*', cors());

const gemini = async (req, res) => {
  console.log(req.body);
  const prompt = req.body.code || req.body.prompt;
  const getAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = getAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const changedPrompt = `
      Given the following React component code, generate a README with the following sections:
      - **States**: Describe the component's states.
      - **Functions**: Overview of each function and their arguments.
      - **State Changes**: Describe how the state changes occur within the component.
      - **Component Overview**: A summary of the component's purpose and functionality.

      React component code:
      \`\`\`javascript
      ${req.body.code || req.body.prompt}
      \`\`\`
    `;

  try {
    const response = await model.generateContent(changedPrompt);
    const readmeContent = response.response.text();

    // Ensure the response is formatted as expected
    res.json({ msg: "success", data: readmeContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error generating README." });
  }
}
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
export { generateReadme,generateReadme2,gemini };
