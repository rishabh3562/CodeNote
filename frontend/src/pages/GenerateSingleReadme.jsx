import React, { useState } from "react";
import { useGenerateReadme } from "../hooks/useGenerateReadme";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import "github-markdown-css"; // GitHub Markdown CSS for consistent markdown styling
import "prismjs/themes/prism-tomorrow.css"; // Prism theme for code block syntax highlighting
import { Puff } from "react-loader-spinner"; // Loader component

function GenerateReadmeComponent() {
  const [code, setCode] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  // Define onSuccess callback for mutation
  const onSuccess = (data) => {
    const readmeData = data.data; // Adjust based on actual response format

    // Process the markdown content using unified
    unified()
      .use(remarkParse)
      .use(remarkStringify, { gfm: true }) // Enabled GitHub Flavored Markdown (GFM)
      .process(readmeData)
      .then((file) => {
        const cleanedMarkdown = String(file).replace(/\n{2,}/g, "\n\n"); // Clean unnecessary new lines
        setMarkdownContent(cleanedMarkdown);
      });
  };

  // Use mutation with onSuccess handler
  const {
    mutate,
    isLoading: isGenerating,
    isError,
    error,
  } = useGenerateReadme(onSuccess);

  const handleGenerate = () => {
    mutate(code); // Trigger mutation
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto p-4">
      {/* Left Column: Input and Button */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl font-extrabold text-blue-600">
          Generate README
        </h2>
        <textarea
          className="w-full p-4 border rounded-lg shadow-md border-gray-300 mb-4 text-gray-800"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
          rows={10}
        />
        <button
          className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-200 ${
            isGenerating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate README"}
        </button>

        {/* Show loader if generating */}
        {isGenerating && (
          <div className="flex justify-center">
            <Puff height="50" width="50" color="blue" ariaLabel="loading" />
          </div>
        )}

        {/* Error Message */}
        {isError && <p className="text-red-500">Error: {error.message}</p>}
      </div>

      {/* Right Column: Display Generated Markdown */}
      <div className="markdown-body bg-white p-6 border rounded-lg shadow-md overflow-auto max-h-screen">
        <h3 className="text-2xl font-bold mb-4">Generated README:</h3>
        {markdownContent ? (
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypePrism] }>
            {markdownContent}
          </ReactMarkdown>
        ) : (
          <p className="text-gray-500">No README generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default GenerateReadmeComponent;
