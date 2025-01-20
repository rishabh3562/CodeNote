import express from 'express';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
const app = express();
app.use(express.json());

const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-pro',
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY
});

//ladki wala code
const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
console.log("genai: ", process.env.GOOGLE_API_KEY)

app.post('/gemini', cors(), async (req, res) => {
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
});



const generateReadme = async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Code is required' });
// console.log("generateReadme: startr ")
    try {
        const promptContext = `You are a helpful assistant that generates markdown documentation for a given JavaScript-based code (majorly React and Node.js).`;
        console.log('Proxying request to Google Generative AI API...');

        const aiMsg = await llm.invoke([
            ["system", promptContext],
            ["human", code],
        ]);
        console.log("generateReadme: aiMsg: ", aiMsg)
        const readmeContent = aiMsg.content;

        res.json({
            message: 'README generated successfully',
            content: aiMsg,
        });
    } catch (error) {
        console.log('Error during proxying:', error);
        res.status(500).json({
            error: 'Failed to generate README',
            reason: error.message
        });
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

app.post('/generate-readme', generateReadme);
app.post('/generate-readme2', generateReadme2);


export default app;














// app.use('/api/generate-readme', createProxyMiddleware({
    //     target: 'https://generativelanguage.googleapis.com/v1beta',  // Base URL
    //     changeOrigin: true,
    //     pathRewrite: {
    //         '^/api/generate-readme': '/models/gemini-1.5-pro:generateContent',  // Rewrite path to API endpoint
    //     },
    //     headers: {
    //         'Authorization': Bearer ${process.env.GOOGLE_API_KEY},  // Your Google API Key
    //         'Content-Type': 'application/json',
    //     },
    //     onProxyReq: (proxyReq, req, res) => {
    //         // Modify the body for the POST request
    //         const body = JSON.stringify({
    //             generationConfig: {
    //                 candidateCount: 1,
    //                 stopSequences: [],
    //                 temperature: 0,
    //             },
    //             contents: [{
    //                 role: "user",
    //                 parts: [{ text: "You are a helpful assistant that generates a README.md file for a given React component." }],
    //             }],
    //             safetySettings: [],
    //         });
    
    //         proxyReq.write(body);
    //         proxyReq.end();
    //     },
    // }));
    

































// const generateReadme =async (req, res) => {
//     const { code } = req.body;

//     if (!code) {
//         return res.status(400).json({ error: 'Code is required' });
//     }

//     try {
//         const promptContext = `
//     You are a helpful assistant that generates markdown 
//     documentation for a given JavaScript based code (majorly React and Node.js).
//     `;

//         const aiMsg = await llm.invoke([
//             ["system", promptContext],
//             ["human", code],
//         ]);

//         const readmeContent = aiMsg.content;

//         // Save the README content to a file
//         const filePath = path.join(__dirname, 'frontend', 'readme', 'README.md');
//         // fs.writeFileSync(filePath, readmeContent, 'utf8');

//         res.json({ message: 'README generated successfully', content: aiMsg });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: 'Failed to generate README',
//             reason: error.message
//         });
//     }
// };
