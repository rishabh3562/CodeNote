import React, { useState } from 'react';
import axios from 'axios';

function GitHubRepoViewer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoContents, setRepoContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [fileContent, setFileContent] = useState('');

  const fetchRepoContents = async (owner, repo, path = '') => {
    setLoading(true);
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

      // Process contents to separate files and directories
      const processedContents = contents.map(item => ({
        name: item.name,
        type: item.type,
        path: item.path,
        contents: [],
        isExpandable: item.type === 'dir',
        isExpanded: false,
      }));

      return processedContents;
    } catch (error) {
      console.error('Error fetching repository contents:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchFileContent = async (owner, repo, path) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const fileData = response.data;
      if (fileData.encoding === 'base64') {
        const content = atob(fileData.content); // Decode base64 content
        setFileContent(content);
      }
    } catch (error) {
      console.error('Error fetching file content:', error);
      setFileContent('Error fetching file content');
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

      // Clear file content when fetching new repository contents
      setFileContent('');
    } else {
      console.error('Invalid GitHub repository URL');
      setRepoContents([]);
    }
  };

  const updateContents = (contents, path, newContents) => {
    return contents.map(item => {
      if (item.path === path) {
        return {
          ...item,
          contents: newContents,
          isExpanded: !item.isExpanded, // Toggle expanded state
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
    if (item.type === 'file') {
      const owner = repoUrl.split('/')[3];
      const repo = repoUrl.split('/')[4];
      const path = item.path;

      await fetchFileContent(owner, repo, path);
    } else {
      const owner = repoUrl.split('/')[3];
      const repo = repoUrl.split('/')[4];
      const path = item.path;

      if (!item.isExpanded) {
        // Fetch contents if not expanded
        const expandedContents = await fetchRepoContents(owner, repo, path);
        setRepoContents(prevContents => updateContents(prevContents, path, expandedContents));
      } else {
        // Collapse folder if already expanded
        setRepoContents(prevContents => updateContents(prevContents, path, []));
        setFileContent(''); // Clear file content when collapsing
      }
    }
  };

  const renderContents = (contents) => {
    return (
      <ul className="space-y-2">
        {contents.map(item => (
          <li key={item.path} className="flex items-center">
            {item.type === 'file' ? (
              <span
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => toggleExpand(item)}
              >
                {item.name}
              </span>
            ) : (
              <div className="flex items-center">
                <span
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => toggleExpand(item)}
                >
                  {item.isExpanded ? '[-] ' : '[+] '}
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
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-lg">
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repository URL"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        value={accessToken}
        onChange={(e) => setAccessToken(e.target.value)}
        placeholder="Enter GitHub Personal Access Token"
        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleFetchRepo}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Fetch Repository
      </button>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      
      <div className="mt-4">
        {renderContents(repoContents)}
      </div>

      {fileContent && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">File Content:</h3>
          <pre className="bg-gray-100 p-4 rounded">{fileContent}</pre>
        </div>
      )}
    </div>
  );
}

export default GitHubRepoViewer;
