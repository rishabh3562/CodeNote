import React from 'react';

const RepositoryStats = ({ stats }) => {
  return (
    <div className="mt-4 p-4 border rounded shadow">
      <h3 className="text-md font-semibold">Repository Stats</h3>
      <ul className="list-disc pl-5">
        <li>⭐ Stars: {stats.stars}</li>
        <li>🍴 Forks: {stats.forks}</li>
        <li>🐛 Open Issues: {stats.openIssues}</li>
        <li>🔄 Commits: {stats.commitCount}</li>
      </ul>
    </div>
  );
};

export default RepositoryStats;
