import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [repoUrl, setRepoUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [repoContents, setRepoContents] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'editor'
  const [fileNotes, setFileNotes] = useState('');

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
      const processedContents = await Promise.all(contents.map(async item => {
        if (item.type === 'dir') {
          // Recursively fetch contents for nested directories
          const nestedContents = await fetchRepoContents(owner, repo, item.path);
          return {
            name: item.name,
            type: item.type,
            path: item.path,
            contents: nestedContents, // Store nested contents
            isExpandable: true,
            isExpanded: false,
          };
        } else {
          return {
            name: item.name,
            type: item.type,
            path: item.path,
          };
        }
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

      // Clear file content and notes when fetching new repository contents
      setFileContent('');
      setFileNotes('');
    } else {
      console.error('Invalid GitHub repository URL');
      setRepoContents([]);
    }
  };

  const handleItemClick = async (item) => {
    if (item.type === 'dir') {
      if (!item.isExpanded) {
        // Fetch contents for the directory if it's expandable and not yet expanded
        const owner = repoUrl.split('/')[3];
        const repo = repoUrl.split('/')[4];
        const path = item.path;

        const expandedContents = await fetchRepoContents(owner, repo, path);

        // Update item with expanded contents
        item.contents = expandedContents;
        item.isExpanded = true;

        // Force update state to reflect changes
        setRepoContents([...repoContents]);
      } else {
        // Collapse the directory if it's already expanded
        item.isExpanded = false;

        // Force update state to reflect changes
        setRepoContents([...repoContents]);
      }
    } else if (item.type === 'file') {
      // Fetch file content when clicking on a file
      const owner = repoUrl.split('/')[3];
      const repo = repoUrl.split('/')[4];
      await fetchFileContent(owner, repo, item.path);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNotesChange = (event) => {
    setFileNotes(event.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white p-4 w-1/4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Folders</h2>
        <ul className="space-y-2">
          {repoContents.map(item => (
            <li key={item.path}>
              <button
                className="w-full text-left text-gray-300 hover:text-white"
                onClick={() => handleItemClick(item)}
              >
                {item.name} {item.isExpandable && (item.isExpanded ? '[-]' : '[+]')}
              </button>
              {item.isExpanded && item.contents && (
                <ul className="pl-4">
                  {item.contents.map(subItem => (
                    <li key={subItem.path}>
                      <button
                        className="w-full text-left text-gray-300 hover:text-white"
                        onClick={() => handleItemClick(subItem)}
                      >
                        {subItem.name} {subItem.isExpandable && (subItem.isExpanded ? '[-]' : '[+]')}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* TopBar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL"
            className="w-96 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="Enter GitHub Personal Access Token"
            className="px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleFetchRepo}
            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Fetch Repository
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <button
            onClick={() => handleTabChange('code')}
            className={`mr-4 px-4 py-2 ${activeTab === 'code' ? 'bg-gray-300 text-gray-800' : 'bg-gray-600 text-white'} rounded`}
          >
            Code
          </button>
          <button
            onClick={() => handleTabChange('editor')}
            className={`px-4 py-2 ${activeTab === 'editor' ? 'bg-gray-300 text-gray-800' : 'bg-gray-600 text-white'} rounded`}
          >
            Editor
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : activeTab === 'code' ? (
          <pre className="bg-gray-100 p-4 rounded">{fileContent}</pre>
        ) : (
          <textarea
            value={fileNotes}
            onChange={handleNotesChange}
            placeholder="Write your notes here..."
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
