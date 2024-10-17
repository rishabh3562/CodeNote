// src/MarkdownEditor.js
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"; // GitHub Flavored Markdown
import "tailwindcss/tailwind.css"; // Tailwind CSS
import rehypeRaw from "rehype-raw";
const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const insertAtCursor = (text) => {
    const textarea = document.getElementById("markdown-input");
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const newMarkdown =
      markdown.substring(0, startPos) +
      text +
      markdown.substring(endPos, markdown.length);
    setMarkdown(newMarkdown);
    textarea.focus();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Markdown Editor</h1>

      {/* Toolbar */}
      <div className="mb-4">
        <button
          onClick={() => insertAtCursor("**bold**")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          Bold
        </button>
        <button
          onClick={() => insertAtCursor("_italic_")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          Italic
        </button>
        <button
          onClick={() => insertAtCursor("# Heading 1\n")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          H1
        </button>
        <button
          onClick={() => insertAtCursor("## Heading 2\n")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          H2
        </button>
        <button
          onClick={() => insertAtCursor("1. List item\n")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          Numbered List
        </button>
        <button
          onClick={() => insertAtCursor("- List item\n")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          Bullet List
        </button>
        <button
          onClick={() => insertAtCursor("`code`\n")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          Code
        </button>
        <button
          onClick={() => insertAtCursor("![alt text](image-url)\n")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          Image
        </button>
        <button
          onClick={() => insertAtCursor("[Link](url)\n")}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
        >
          Link
        </button>
      </div>

      {/* Editor and Preview Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Markdown Input Section */}
        <div className="editor-container border rounded-lg overflow-hidden shadow-sm">
          <textarea
            id="markdown-input"
            value={markdown}
            onChange={handleChange}
            className="w-full h-96 p-4 border-none focus:outline-none"
            placeholder="Write your markdown here..."
          />
        </div>

        {/* Markdown Preview Section */}
        <div className="preview-container border rounded-lg p-4 bg-gray-100 shadow-sm overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div className="markdown-body bg-gray-100 p-4 border border-gray-300 rounded-md">
            <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
