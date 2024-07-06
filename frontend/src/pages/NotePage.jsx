import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function NotePage() {
  const { id } = useParams();
  const { data: note, loading, error } = useFetch(`/api/notes/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}

export default NotePage;
