import axios from 'axios';
import Repo from '../models/Repo.js'; // Ensure the file extension is included
import { generateAndStoreDocs } from './generateDocs.js'; // Ensure the file extension is included

// Fetch repository from GitHub
const fetchRepo = async (repoUrl) => {
  const [owner, repo] = repoUrl.split('/').slice(-2);
  const { data: repoData } = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
  
  const existingRepo = await Repo.findOne({ url: repoUrl });
  const commitHashes = await getCommitHashes(repoUrl);
  
  if (existingRepo) {
    return { repoId: existingRepo._id, commitHashes };
  } else {
    const newRepo = new Repo({
      name: repoData.name,
      url: repoUrl,
      commitHashes
    });
    await newRepo.save();
    await generateAndStoreDocs(newRepo._id, repoUrl);
    return { repoId: newRepo._id, commitHashes };
  }
};

// Update commit hashes
const updateCommitHashes = async (repoId, commitHashes) => {
  await Repo.findByIdAndUpdate(repoId, { commitHashes });
};

// Get commit hashes (dummy function)
const getCommitHashes = async (repoUrl) => {
  // Implementation to fetch commit hashes
  return [];
};

export { fetchRepo, updateCommitHashes }; // Changed from module.exports
