import React, { useState } from "react";
import axios from "axios";

function GitHubRepoViewer() {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoContents, setRepoContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepoContents = async (owner, repo, path = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      );
      const contents = response.data;

      // Process contents to separate files and directories
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
      setError("Error fetching repository contents");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRepo = async () => {
    setError("");
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

  const toggleExpand = async (item) => {
    if (item.isExpandable && !item.isExpanded) {
      const owner = repoUrl.split("/")[3];
      const repo = repoUrl.split("/")[4];
      const path = item.path;

      const expandedContents = await fetchRepoContents(owner, repo, path);
      item.contents = expandedContents;
      item.isExpanded = true;

      setRepoContents([...repoContents]);
    } else {
      item.isExpanded = false;
      setRepoContents([...repoContents]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-5">
          GitHub Repository Viewer
        </h1>
        <div className="flex items-center mb-5">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL"
            className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetchRepo}
            className="bg-blue-500 text-white px-5 py-3 rounded-r-md hover:bg-blue-600 transition"
          >
            Fetch Repository
          </button>
        </div>
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        <ul className="bg-white rounded shadow-md p-5">
          {repoContents.map((item) => (
            <li key={item.path} className="mb-2">
              {item.type === "file" ? (
                <span className="text-gray-700">{item.name}</span>
              ) : (
                <div>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleExpand(item)}
                    className="text-blue-500 font-medium"
                  >
                    {item.isExpanded ? "[-] " : "[+] "}
                    {item.name}/
                  </span>
                  {item.isExpanded && (
                    <ul className="pl-5">
                      {item.contents.map((subItem) => (
                        <li key={subItem.path}>
                          {subItem.type === "file" ? (
                            <span className="text-gray-700">
                              {subItem.name}
                            </span>
                          ) : (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => toggleExpand(subItem)}
                              className="text-blue-500 font-medium"
                            >
                              {subItem.isExpanded ? "[-] " : "[+] "}
                              {subItem.name}/
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GitHubRepoViewer;
