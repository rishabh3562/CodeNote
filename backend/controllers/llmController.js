import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import fs from 'fs'; // Import the file system module

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GOOGLE_API_KEY
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

const promptContext = `
You are a helpful assistant that generates markdown 
documentation for a given javascript based code (majorly react and nextjs and node js).
`;
const aiMsg = await llm.invoke([
  [
    "system",promptContext
  ],
  ["human", reactComponent],
]);

// Store the response in a markdown file
// fs.writeFileSync('frontend/readme/README.md', aiMsg, 'utf8'); // Save the response to README.md

console.log(aiMsg.content);

// New function to handle markdown generation
