import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NoteList({ projectId }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(`/api/notes/project/${projectId}`).then(response => {
      setNotes(response.data);
    });
  }, [projectId]);

  return (
    <ul>
      {notes.map(note => (
        <li key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
