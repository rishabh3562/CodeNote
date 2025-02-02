import React, { useState, useEffect } from 'react';
// import RepositoryStats from './components/RepositoryStats';
import Chart from '../components/chart';
import { fetchRepositoryStats } from '../utils/api';

const RepositoryStats = ({ stats }) => {
  return (
    <div>
      <h2>Repository Stats</h2>
      <ul>
        <li>Stars: {stats.stars}</li>
        <li>Forks: {stats.forks}</li>
        <li>Open Issues: {stats.openIssues}</li>
        <li>Commits: {stats.commitCount}</li>
      </ul>
    </div>
  );
};

const App = () => {
  const [repoStats, setRepoStats] = useState(null);

  useEffect(() => {
    // Replace with your actual GitHub repo details
    fetchRepositoryStats('rishabh3562', 'CodeNote').then((data) =>
      setRepoStats(data)
    );
  }, []);

  return (
    <div>
      <h1>Repository Insights</h1>
      {repoStats ? (
        <>
          <RepositoryStats stats={repoStats} />
          <Chart data={repoStats} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
