import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GoogleGenerativeAI } from '@google/generative-ai';


// const llm = new ChatGoogleGenerativeAI({
//   model: 'gemini-1.5-pro',
//   temperature: 0,
//   apiKey: process.env.GOOGLE_API_KEY,
// });

// // Controller for /gemini route
// export const geminiHandler = async (req, res) => {
//   console.log(req.body);
//   const prompt = req.body.code || req.body.prompt;

//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const changedPrompt = `
//           Given the following React component code, generate a README with the following sections:
//           - **States**: Describe the component's states.
//           - **Functions**: Overview of each function and their arguments.
//           - **State Changes**: Describe how the state changes occur within the component.
//           - **Component Overview**: A summary of the component's purpose and functionality.

//           React component code:
//           \`\`\`javascript
//           ${prompt}
//           \`\`\`
//         `;

//     const response = await model.generateContent(changedPrompt);
//     const readmeContent = response.response.text();

//     res.json({ msg: 'success', data: readmeContent });
//   } catch (error) {
//     console.error('Error generating README:', error);
//     res.status(500).json({ error: error.message || 'Error generating README.' });
//   }
// };

// // Controller for /generate-readme route
// export const generateReadme = async (req, res) => {
//   const { code } = req.body;
//   if (!code) return res.status(400).json({ error: 'Code is required' });

//   try {
//     const promptContext = `You are a helpful assistant that generates markdown documentation for a given JavaScript-based code (majorly React and Node.js).`;

//     const aiMsg = await llm.invoke([
//       ['system', promptContext],
//       ['human', code],
//     ]);

//     res.json({
//       message: 'README generated successfully',
//       content: aiMsg.content,
//     });
//   } catch (error) {
//     console.error('Error generating README:', error);
//     res.status(500).json({
//       error: 'Failed to generate README',
//       reason: error.message,
//     });
//   }
// };

// // Controller for /generate-readme/alt route
// export const generateReadme2 = async (req, res) => {
//   const { code } = req.body;
//   if (!code) return res.status(400).json({ error: 'Code is required' });

//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const prompt = 'Write a story about a magic backpack.';

//     const result = await model.generateContent(prompt);
//     res.json({
//       message: 'README generated successfully',
//       content: result.response.text(),
//     });
//   } catch (error) {
//     console.error('Error generating README:', error);
//     res.status(500).json({
//       error: 'Failed to generate README',
//       reason: error.message,
//     });
//   }
// };
