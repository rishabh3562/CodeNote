import React, { useEffect, useState } from "react";

const RepoFetcher = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/YOUR_USERNAME/repos"
        );
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        Public Repositories
      </h2>
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
              {repo.description || "No description available."}
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
