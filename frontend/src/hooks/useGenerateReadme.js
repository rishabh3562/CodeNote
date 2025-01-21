import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ENDPOINT } from '../utils/constant';

const generateReadme = async (code) => {
  const response = await axios.post(ENDPOINT.GEMINI, { code });
  return response.data;
};

export const useGenerateReadme = (onSuccess) => {
  return useMutation({
    mutationFn: generateReadme,
    onSuccess,
    onError: (error) => {
      console.error('Error generating README:', error);
    },
  });
};

/*

generateReadme, {
    onSuccess, // Trigger onSuccess callback when mutation is successful
    onError: (error) => {
      console.error("Error generating README:", error);
    }
  }
*/
