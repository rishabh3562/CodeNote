import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, ENDPOINT } from "../utils/constant";
import axios from "axios";
const ChatBot = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { user: "user", text: input };
    const updatedChatHistory = [...chatHistory, newMessage];

    setChatHistory(updatedChatHistory);
    setInput("");

    // Send the current message and chat history to the backend
    const response = await fetch(ENDPOINT.GEMINI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ history: updatedChatHistory, message: input }),
    });

    const data = await response.json();
    const botMessage = { user: "model", text: data.reply };

    setChatHistory((prevHistory) => [...prevHistory, botMessage]);
  };

const handleGetResponse= async () => {
  const response = await axios.post(ENDPOINT.GET_RESPONSE);
  console.log(response);
}
const handleGetResponse2= async () => {
  const response = await axios.post(ENDPOINT.GEMINI,{prompt});
  console.log(prompt);
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to know?"
        />
        <button type="submit">Ask me</button>
      </form>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <button onClick={handleGetResponse}>Get Response</button>
      <form action="" method="post">
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </form>
      <button onClick={handleGetResponse2}>Post Prompt</button>
    </div>
  );
};

export default ChatBot;
