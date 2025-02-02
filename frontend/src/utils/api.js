import axios from 'axios';
import { API_URL } from './constant';

const API_BASE = API_URL + '/api';
export const fetchRepositoryStats = async (owner, repo) => {
  if (!owner || !repo) return null;
  const { data } = await axios.get(`${API_BASE}/repositories/${owner}/${repo}`);
  return data;
};

export const fetchUserActivity = async (username) => {
  if (!username) return null;
  const { data } = await axios.get(`${API_BASE}/user/${username}/activity`);
  console.log('userleveldata in the api.js', data);
  return data;
};
