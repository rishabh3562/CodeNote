import api from './api';

const githubService = {
    fetchRepoStructure: async (owner, repo) => {
        try {
            const response = await api.get(`/github/repo-structure?owner=${owner}&repo=${repo}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default githubService;
