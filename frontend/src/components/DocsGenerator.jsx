import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const DocsGenerator = ({ repoId }) => {
  const mutation = useMutation(async () => {
    const response = await axios.post(`/api/docs/generate`, { repoId });
    return response.data;
  });

  const handleGenerateDocs = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button onClick={handleGenerateDocs} disabled={mutation.isLoading}>
        Generate Documentation
      </button>
      {mutation.isLoading && <p>Generating...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Documentation generated successfully!</p>}
    </div>
  );
};

export default DocsGenerator;
