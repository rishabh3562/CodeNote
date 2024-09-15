const { generatePromptContext } = require('../services/promptContext');
const Repo = require('../models/Repo');

const generateContext = async (req, res) => {
    const { repoId } = req.body;
    try {
        const repo = await Repo.findById(repoId);
        if (!repo) {
            return res.status(404).json({ message: 'Repository not found' });
        }

        // Example path; adjust according to where the repo is stored
        const repoPath = `/path/to/repos/${repo.name}`;
        const context = await generatePromptContext(repoId, repoPath);

        res.json({ message: 'Prompt context generated successfully', context });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { generateContext };
