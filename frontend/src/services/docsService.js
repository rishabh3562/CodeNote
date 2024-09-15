import axios from 'axios';

export const fetchDocs = async (repoId) => {
  const response = await axios.get(`/api/docs/${repoId}`);
  return response.data;
};
