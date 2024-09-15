import React from "react";
import { useMutation } from "react-query";
import axios from "axios";

const RepoFetcher = ({ repoId }) => {
  const mutation = useMutation(async () => {
    const response = await axios.post(`/api/repos/fetch`, { repoId });
    return response.data;
  });

  const handleFetchRepo = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button onClick={handleFetchRepo} disabled={mutation.isLoading}>
        Fetch Repository
      </button>
      {mutation.isLoading && <p>Fetching...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Repository fetched successfully!</p>}
    </div>
  );
};

export default RepoFetcher;
