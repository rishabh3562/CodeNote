import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      
      <h1>Home</h1>
      <div>
        
        <button onClick={() => navigate('/GitHubRepoViewer')}>Go to GitHub Viewer</button>
        </div>
      <div>
        
        <button onClick={() => navigate('/GitHubRepoViewerv1')}>Go to GitHub Viewer V1</button>
        </div>
      <div>
        
        <button onClick={() => navigate('/githubViewerV2')}>Go to GitHub Viewer V2</button>
        </div>
      <div>
        
        <button onClick={() => navigate('/githubViewerV3')}>Go to GitHub Viewer V3</button>
        </div>
      <div>
        
        <button onClick={() => navigate('/generateReadme')}>Go to Generate Readme</button>
        </div>
        <div>
          <button onClick={() => navigate('/test')}>Go to test</button>
        </div>
        <div>
          <button onClick={() => navigate('/Llmcall')}>Go to llmcall</button>
        </div>
        <div>
          <button onClick={() => navigate('/ChatBot')}>Go to Chatbot createdby ania</button>
        </div>
        <div>
          <button onClick={() => navigate('/md')}>Go to markdown editor</button>
        </div>
    </div>
  )
}

export default Home
