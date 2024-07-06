import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL } from '../services/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url= `/api/projects`;
        console.log(url);
        const response = await axios.get(url);
        console.log(response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching projects:', error);
        setProjects([]);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>; // Handle loading state
  }

  return (
    <ul>
      {projects.map(project => (
        <li key={project._id}>
          <Link to={`/projects/${project._id}`}>{project.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
