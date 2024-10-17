import React, { useState } from "react";
import { useGenerateReadme } from "../hooks/useGenerateReadme";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import rehypeRaw from "rehype-raw";
import "github-markdown-css"; // Import GitHub Markdown CSS for better styling

function GenerateReadmeComponent() {
  const [code, setCode] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  // Define onSuccess callback for mutation
  const onSuccess = (data) => {
    const readmeData = data.data; // Adjust based on actual response format

    // Process the markdown content using unified
    unified()
      .use(remarkParse)
      .use(remarkStringify, { gfm: true }) // Enable GitHub Flavored Markdown
      .process(readmeData)
      .then((file) => {
        const cleanedMarkdown = String(file).replace(/\n{2,}/g, "\n\n"); // Clean unnecessary new lines
        setMarkdownContent(cleanedMarkdown);
      });
  };

  // Use mutation with onSuccess handler
  const { mutate, isLoading: isGenerating, isError, error } = useGenerateReadme(onSuccess);

  const handleGenerate = () => {
    mutate(code); // No need to await, result will be handled by onSuccess
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Generate README</h2>
      <textarea
        className="w-full p-2 border rounded-md border-gray-300 mb-4"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        rows={10}
      />
      <button
        className={`w-full bg-blue-500 text-white font-semibold py-2 rounded-md mb-4 ${
          isGenerating ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate README"}
      </button>
      {isError && <p className="text-red-500 mb-4">Error: {error.message}</p>}
      {markdownContent && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Generated README:</h3>
          <div className="markdown-body bg-gray-100 p-4 border border-gray-300 rounded-md">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateReadmeComponent;
