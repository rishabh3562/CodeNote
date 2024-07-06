import React from 'react';
import ProjectList from '../components/ProjectList';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Projects</h2>
      <ProjectList />
    </div>
  );
}

export default Home;
