import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchDocs } from '../services/docsService';
import ReactMarkdown from 'react-markdown';

const DocsViewer = ({ repoId }) => {
  const { data: docs, isLoading, isError } = useQuery(['docs', repoId], () => fetchDocs(repoId));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <div>
      {docs.map((doc) => (
        <div key={doc.filePath}>
          <h2>{doc.filePath}</h2>
          <ReactMarkdown>{doc.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default DocsViewer;
