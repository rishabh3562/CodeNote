import React, { useState } from 'react';
import axios from 'axios';

function GitHubRepoViewer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoContents, setRepoContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(''); // State to store access token

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
        // Initialize with an empty array to avoid errors
        contents: [],
        // For directories, mark them as expandable
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
    // Parse owner and repo from repoUrl
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

  const toggleExpand = async (item, parentContents) => {
    if (item.isExpandable && !item.isExpanded) {
      // Fetch contents for the directory if it's expandable and not yet expanded
      const owner = repoUrl.split('/')[3];
      const repo = repoUrl.split('/')[4];
      const path = item.path;
      
      const expandedContents = await fetchRepoContents(owner, repo, path);

      // Update item with expanded contents
      item.contents = expandedContents;
      item.isExpanded = true;

      // Update the parentContents to reflect changes
      const updatedContents = parentContents.map(content => 
        content.path === item.path ? item : content
      );

      // Update the state with the new contents
      setRepoContents([...updatedContents]);
    } else {
      // Collapse the directory if it's already expanded
      item.isExpanded = false;

      // Update the parentContents to reflect changes
      const updatedContents = parentContents.map(content => 
        content.path === item.path ? item : content
      );

      // Update the state with the new contents
      setRepoContents([...updatedContents]);
    }
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
      
      <ul>
        {repoContents.map(item => (
          <li key={item.path}>
            {item.type === 'file' ? (
              <span>{item.name}</span>
            ) : (
              <div>
                <span style={{ cursor: 'pointer' }} onClick={() => toggleExpand(item, repoContents)}>
                  {item.isExpanded ? '[-] ' : '[+] '}
                  {item.name}/
                </span>
                {item.isExpanded && (
                  <ul>
                    {item.contents.map(subItem => (
                      <li key={subItem.path}>
                        {subItem.type === 'file' ? (
                          <span>{subItem.name}</span>
                        ) : (
                          <span style={{ cursor: 'pointer' }} onClick={() => toggleExpand(subItem, item.contents)}>
                            {subItem.isExpanded ? '[-] ' : '[+] '}
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
  );
}

export default GitHubRepoViewer;
