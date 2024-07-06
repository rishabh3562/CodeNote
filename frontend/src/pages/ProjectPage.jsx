import React from 'react';
import { useParams } from 'react-router-dom';
import NoteList from '../components/NoteList';

function ProjectPage() {
  const { projectId } = useParams();

  return (
    <div>
      <h2>Project Details</h2>
      <NoteList projectId={projectId} />
    </div>
  );
}

export default ProjectPage;
