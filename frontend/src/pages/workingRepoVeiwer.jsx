import React, { useState } from 'react';
import axios from 'axios';

function GitHubRepoViewer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoContents, setRepoContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');

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

  const handleFetchRepo = async () => {
    const regex = /github.com\/([^/]+)\/([^/]+)\/*/i;
    const match = repoUrl.match(regex);

    if (match && match.length >= 3) {
      const owner = match[1];
      const repo = match[2];

      const contents = await fetchRepoContents(owner, repo);
      setRepoContents(contents);
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
      const owner = repoUrl.split('/')[3];
      const repo = repoUrl.split('/')[4];
      const path = item.path;

      const expandedContents = await fetchRepoContents(owner, repo, path);

      setRepoContents(prevContents => updateContents(prevContents, path, expandedContents));
    } else {
      setRepoContents(prevContents =>
        updateContents(prevContents, item.path, [])
      );
    }
  };

  const renderContents = (contents) => {
    return (
      <ul>
        {contents.map(item => (
          <li key={item.path}>
            {item.type === 'file' ? (
              <span>{item.name}</span>
            ) : (
              <div>
                <span style={{ cursor: 'pointer' }} onClick={() => toggleExpand(item)}>
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
    <div>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repository URL"
      />
      <input
        type="text"
        value={accessToken}
        onChange={(e) => setAccessToken(e.target.value)}
        placeholder="Enter GitHub Personal Access Token"
      />
      <button onClick={handleFetchRepo}>Fetch Repository</button>

      {loading && <p>Loading...</p>}
      
      {renderContents(repoContents)}
    </div>
  );
}

export default GitHubRepoViewer;
