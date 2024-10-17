import React, { useState } from "react";
import { useGenerateReadme } from "../hooks/useGenerateReadme";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import "github-markdown-css"; // GitHub Markdown CSS for styling
import "prismjs/themes/prism-tomorrow.css"; // Prism theme for code highlighting
import { Puff } from "react-loader-spinner"; // Loader component

function GenerateReadmeComponent() {
  const [code, setCode] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  // onSuccess callback for mutation
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

  const {
    mutate,
    isLoading: isGenerating,
    isError,
    error,
  } = useGenerateReadme(onSuccess);

  const handleGenerate = () => {
    mutate(code); // Trigger the mutation to generate README
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto p-4">
      {/* Left Column: Text Area */}
      <div>
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

        {/* Show loader if generating */}
        {isGenerating && (
          <div className="flex justify-center mb-4">
            <Puff height="50" width="50" color="blue" ariaLabel="loading" />
          </div>
        )}

        {isError && <p className="text-red-500 mb-4">Error: {error.message}</p>}
      </div>

      {/* Right Column: Generated README */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Generated README:</h3>
        <div className="markdown-body bg-gray-100 p-4 border border-gray-300 rounded-md max-h-[600px] overflow-auto">
          {markdownContent ? (
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypePrism]}>
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-500">No README generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateReadmeComponent;
