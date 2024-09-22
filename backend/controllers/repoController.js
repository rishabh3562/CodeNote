import axios from 'axios';
import Repo from '../models/Repo.js';

const fetchRepo = async (req, res) => {
    const { repoId } = req.body;
    try {
        // Replace with actual GitHub API request
        const response = await axios.get(`https://api.github.com/repos/${repoId}`);
        const repoData = response.data;

        // Store repo metadata in MongoDB
        await Repo.updateOne(
            { _id: repoId },
            { $set: { ...repoData, lastFetched: new Date() } },
            { upsert: true }
        );

        res.json({ message: 'Repository fetched successfully', data: repoData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { fetchRepo };
