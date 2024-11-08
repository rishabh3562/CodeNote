import { generateAndStoreDocs } from '../services/generateDocs.js';
import Repo from '../models/Repo.js';

const generateDocs = async (req, res) => {
    const { repoId } = req.body;
    try {
        const repo = await Repo.findById(repoId);
        if (!repo) {
            return res.status(404).json({ message: 'Repository not found' });
        }

        // Example path; adjust according to where the repo is stored
        const repoPath = `/path/to/repos/${repo.name}`;
        await generateAndStoreDocs(repoId, repoPath);

        res.json({ message: 'Documentation generated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { generateDocs };
