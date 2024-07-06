import React, { useState } from 'react';
import axios from 'axios';

function RepoStructure() {
  const [repoUrl, setRepoUrl] = useState('');
  const [structure, setStructure] = useState([]);

  const getRepoStructure = async () => {
    const [owner, repo] = repoUrl.split('/').slice(-2);
    const response = await axios.get(`/api/github/repo-structure?owner=${owner}&repo=${repo}`);
    setStructure(response.data);
  };

  return (
    <div>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repo URL"
      />
      <button onClick={getRepoStructure}>Fetch Structure</button>
      <ul>
        {structure.map(item => (
          <li key={item.sha}>
            {item.path} {item.type === 'tree' ? '(folder)' : '(file)'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoStructure;
