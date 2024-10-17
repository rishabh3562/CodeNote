import React, { useState } from "react";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import fs from 'fs'; // Import the file system module

// Store the response in a markdown file
// fs.writeFileSync('frontend/readme/README.md', aiMsg, 'utf8'); // Save the response to README.md

const Llmcall = () => {
  const [aiMsg, setAiMsg] = useState(null);
  const handleLlm = async () => {
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-pro",
      temperature: 0,
      maxRetries: 2,
      apiKey:import.meta.env.VITE_GEMINI_API_KEY,
      // other params...
    });

    // Define the syntax for the markdown code
    const syntax = `
      # MyComponent
      
      ## Overview
      A simple React component that allows users to increment a counter using React hooks.
      
      
      ## Usage
      How to import and use the component in a React application.
      
      ## Features
      List of features provided by the component.
      
      ## Parameters
      Description of any parameters that can be configured.
      
      ## Example
      Code example demonstrating how to use the component.
      
      
      `;

    // New prompt to generate README for a React component
    const reactComponent = `
      import React, { useState } from 'react';
      
      function MyComponent() {
        const [count, setCount] = useState(0);
        
        return (
          <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p>Count: {count}</p>
          </div>
        );
      }
      
      export default MyComponent;
      `;

    const context =
      "You are a helpful assistant that generates a README.md file for a given React component.";
    const aiMsg = await llm.invoke([
      ["system", context],
      ["human", reactComponent],
    ]);
    console.log(aiMsg);
    setAiMsg(aiMsg.candidates.content.parts[0]);
  };
 
  return (
    <div>
      <h1>Llmcall</h1>
      <button onClick={handleLlm}>Call LLM</button>
      <div>{aiMsg}</div>
      <div>{JSON.stringify(aiMsg)}</div>
      <button onClick={()=>{console.log(aiMsg)}}>refresh aiMsg</button>
    </div>
  );
};

export default Llmcall;
