import React, { useState,useEffect } from "react";
import { useGenerateReadme } from "../hooks/useGenerateReadme";
import axios from "axios";
import { ENDPOINT } from "../utils/constant";
import ReactMarkdown from "react-markdown";
import MarkdownIt from 'markdown-it';
import { marked } from 'marked';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css'; // Import GitHub Markdown CSS for better styling
const fakeData = {
  msg: "success",
  data: "## NotFound Component README\n\nThis component displays a \"Not Found\" message and a link back to the home page when a user navigates to a non-existent page.\n\n### States\n\nThis component has no state variables.\n\n### Functions\n\nThis component has no custom functions.\n\n### State Changes\n\nThis component does not modify any state variables.\n\n### Component Overview\n\nThe `NotFound` component renders a simple message informing the user that the requested page could not be found. It also provides a link to the home page, allowing the user to navigate back to the main application.\n\n**Structure:**\n\nThe component consists of a single `div` containing the \"Are you lost?\" message and a `Link` component to navigate to the home page (`/`).\n\n**Example Usage:**\n\nThe `NotFound` component is typically used as a fallback route in a React Router configuration. This ensures that a user is presented with a user-friendly message and a way to return to a known location when accessing an invalid URL.\n\n**Example Code:**\n\n```javascript\nimport React from 'react'\nimport {Link} from 'react-router-dom';\n\nconst NotFound = () => {\n  return (\n      <>\n    <div>\n      Are you lost? \n    </div>\n    <Link to={'/'}>Home</Link>\n    </>\n  )\n}\n\nexport default NotFound\n```\n",
};
function GenerateReadmeComponent() {
    const [code, setCode] = useState("");
    const [markdownContent, setMarkdownContent] = useState("");
    const { mutate, isLoading: isGenerating, isError, error } = useGenerateReadme();
  
    // Markdown transformation using unified
    useEffect(() => {
      unified()
        .use(remarkParse)
        .use(remarkStringify, { gfm: true }) // Enable GitHub Flavored Markdown
        .process(fakeData.data)
        .then((file) => {
          const cleanedMarkdown = String(file).replace(/\n{2,}/g, '\n\n'); // Clean unnecessary new lines
          console.log(cleanedMarkdown)
          setMarkdownContent(cleanedMarkdown);
        });
    }, []);
  
    const handleGenerate = () => {
      mutate(code);
    };
  
    const handleTest = async () => {
      const res = await axios.get(ENDPOINT.TEST);
      console.log(res);
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
          className={`w-full bg-blue-500 text-white font-semibold py-2 rounded-md mb-4 ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
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
        <button
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-md mb-4"
          onClick={handleTest}
        >
          Test
        </button>
        <style jsx>{`
          .prose {
            max-width: 100%;
            overflow-wrap: break-word;
          }
        `}</style>
      </div>
    );
  }
  
  export default GenerateReadmeComponent;
