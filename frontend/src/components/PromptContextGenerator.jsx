import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const PromptContextGenerator = ({ repoId }) => {
  const mutation = useMutation(async () => {
    const response = await axios.post(`/api/prompt/generate`, { repoId });
    return response.data;
  });

  const handleGenerateContext = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button onClick={handleGenerateContext} disabled={mutation.isLoading}>
        Generate Prompt Context
      </button>
      {mutation.isLoading && <p>Generating...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Prompt context generated successfully!</p>}
    </div>
  );
};

export default PromptContextGenerator;
