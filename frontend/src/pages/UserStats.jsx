import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRepositoryStats, fetchUserActivity } from '../utils/api';
import RepositoryStats from '../components/RepositoryStats';
import UserActivity from '../components/UserActivity';

const App = () => {
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [username, setUsername] = useState('');

  // Fetch Repository Stats
  const {
    data: repoStats,
    isLoading: repoLoading,
    isError: repoError,
  } = useQuery({
    queryKey: ['repoStats', repoOwner, repoName],
    queryFn: () => fetchRepositoryStats(repoOwner, repoName),
    enabled: !!repoOwner && !!repoName,
  });

  // Fetch User Activity
  const {
    data: userStats,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['userStats', username],
    queryFn: () => fetchUserActivity(username),
    enabled: !!username,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitHub Insights</h1>

      {/* Repository Analysis */}
      {/* <div className="mb-6">
        <h2 className="text-lg font-semibold">Repository Analysis</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setRepoOwner(e.target.owner.value);
            setRepoName(e.target.repo.value);
          }}
          className="flex gap-2"
        >
          <input
            className="border p-2"
            type="text"
            name="owner"
            placeholder="Owner"
            required
          />
          <input
            className="border p-2"
            type="text"
            name="repo"
            placeholder="Repo"
            required
          />
          <button className="bg-blue-500 text-white p-2 rounded">
            Analyze
          </button>
        </form>

        {repoLoading && <p>Loading repository data...</p>}
        {repoError && <p>Error fetching repo data.</p>}
        {repoStats && <RepositoryStats stats={repoStats} />}
      </div> */}

      {/* User Activity Analysis */}
      <div>
        <h2 className="text-lg font-semibold">User Activity Analysis</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUsername(e.target.username.value);
          }}
          className="flex gap-2"
        >
          <input
            className="border p-2"
            type="text"
            name="username"
            placeholder="GitHub Username"
            required
          />
          <button className="bg-green-500 text-white p-2 rounded">
            Analyze
          </button>
        </form>

        {userLoading && <p>Loading user data...</p>}
        {userError && <p>Error fetching user data.</p>}
        {userStats && <UserActivity stats={userStats} />}
      </div>
    </div>
  );
};

export default App;
