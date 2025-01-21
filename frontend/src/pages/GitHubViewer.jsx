import React, { useState } from 'react';

const RepoFetcher = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        GitHub Repository Viewer
      </h2>
      <div className="mb-5 text-center">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-80"
        />
        <button
          onClick={fetchRepos}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Fetch Repos
        </button>
      </div>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-600">Error: {error}</div>}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-blue-600">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h3>
            <p className="text-gray-700 mt-1">
              {repo.description || 'No description available.'}
            </p>
            <div className="mt-2 flex flex-wrap">
              {repo.language && (
                <span className="bg-gray-200 text-gray-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                  {repo.language}
                </span>
              )}
              <span className="bg-gray-200 text-gray-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                Stars: {repo.stargazers_count}
              </span>
              <span className="bg-gray-200 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded">
                Forks: {repo.forks_count}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoFetcher;
