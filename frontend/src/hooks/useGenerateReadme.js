import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ENDPOINT } from '../utils/constant';
import { queryClient } from '../main';
const generateReadme = async (code) => {
    try {
        const response = await axios.post(ENDPOINT.GEMINI, { code });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const useGenerateReadme = () => {
    const mutation = useMutation({
        mutationFn: (code) => generateReadme(code)
    })

    return mutation;
};
