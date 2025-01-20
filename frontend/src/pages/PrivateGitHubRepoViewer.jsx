import React, { useState } from "react";
import axios from "axios";

function GitHubRepoViewer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoContents, setRepoContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");

  const fetchRepoContents = async (owner, repo, path = "") => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const contents = response.data;

      const processedContents = contents.map((item) => ({
        name: item.name,
        type: item.type,
        path: item.path,
        contents: [],
        isExpandable: item.type === "dir",
        isExpanded: false,
      }));

      return processedContents;
    } catch (error) {
      setError("Failed to fetch repository contents. Check your URL or token.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRepo = async () => {
    const regex = /github.com\/([^/]+)\/([^/]+)\/*/i;
    const match = repoUrl.match(regex);

    if (match && match.length >= 3) {
      const owner = match[1];
      const repo = match[2];
      const contents = await fetchRepoContents(owner, repo);
      setRepoContents(contents);
    } else {
      setError("Invalid GitHub repository URL");
      setRepoContents([]);
    }
  };

  const updateContents = (contents, path, newContents) => {
    return contents.map((item) => {
      if (item.path === path) {
        return {
          ...item,
          contents: newContents,
          isExpanded: true,
        };
      } else if (item.isExpandable) {
        return {
          ...item,
          contents: updateContents(item.contents, path, newContents),
        };
      }
      return item;
    });
  };

  const toggleExpand = async (item) => {
    if (item.isExpandable && !item.isExpanded) {
      const owner = repoUrl.split("/")[3];
      const repo = repoUrl.split("/")[4];
      const path = item.path;

      const expandedContents = await fetchRepoContents(owner, repo, path);

      setRepoContents((prevContents) =>
        updateContents(prevContents, path, expandedContents)
      );
    } else {
      setRepoContents((prevContents) =>
        updateContents(prevContents, item.path, [])
      );
    }
  };

  const renderContents = (contents) => {
    return (
      <ul className="pl-5 list-disc">
        {contents.map((item) => (
          <li key={item.path} className="my-1">
            {item.type === "file" ? (
              <span className="text-gray-700">{item.name}</span>
            ) : (
              <div>
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => toggleExpand(item)}
                >
                  {item.isExpanded ? "[-] " : "[+] "}
                  {item.name}/
                </span>
                {item.isExpanded && renderContents(item.contents)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          GitHub Repository Viewer
        </h1>
        <div className="mb-5">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL"
            className="w-full p-3 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="Enter GitHub Personal Access Token"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleFetchRepo}
          className="bg-blue-500 text-white py-2 px-5 rounded-md hover:bg-blue-600 transition w-full"
        >
          Fetch Repository
        </button>
        {loading && (
          <p className="text-gray-500 text-center mt-3">Loading...</p>
        )}
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        <div className="mt-5 bg-gray-50 p-5 rounded-lg shadow-inner">
          {renderContents(repoContents)}
        </div>
      </div>
    </div>
  );
}

export default GitHubRepoViewer;
