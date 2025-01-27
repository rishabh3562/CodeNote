import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FRONTEND_ROUTES } from '../utils/constant';
import { Code, FileText, Bot, Zap, ArrowRight, Github } from 'lucide-react';
import '../index.css';

const features = [
  {
    icon: <Code className="w-12 h-12 text-blue-400" />,
    title: 'Repository Analysis',
    description: 'Fetch and analyze code repositories with ease.',
  },
  {
    icon: <FileText className="w-12 h-12 text-green-400" />,
    title: 'Documentation Generation',
    description:
      'Automatically generate structured documentation for your projects.',
  },
  {
    icon: <Bot className="w-12 h-12 text-purple-400" />,
    title: 'AI Context Creation',
    description: 'Create project context for AI agents like ChatGPT.',
  },
  {
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
    title: 'Lightning Fast',
    description: 'Analyze repositories and generate docs in seconds.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0f172a] to-[#0B1120]" />

        {/* Animated gradient orbs */}
        <div
          className="absolute top-0 -right-1/4 w-[1000px] h-[1000px] animate-gradient"
          style={{
            background:
              'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, rgba(59, 130, 246, 0.15) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div
          className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] animate-gradient"
          style={{
            background:
              'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(67, 56, 202, 0.15) 45%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '-3s',
          }}
        />

        <div
          className="absolute bottom-0 left-1/3 w-[1000px] h-[1000px] animate-gradient"
          style={{
            background:
              'radial-gradient(circle at center, rgba(14, 165, 233, 0.15) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '-6s',
          }}
        />

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-25 animate-pulse-slow"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
          }}
        />
      </div>

      {/* Spotlight Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large Central Spotlight */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-[1500px] h-[1500px] rounded-full animate-gradient"
          style={{
            background:
              'radial-gradient(circle at center, rgba(30, 64, 175, 0.35) 0%, rgba(30, 64, 175, 0.15) 40%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.7,
            animationDelay: '-9s',
          }}
        />

        {/* Bright Blue Spotlight */}
        <div
          className="absolute top-0 right-0 
            w-[1000px] h-[1000px] rounded-full animate-gradient"
          style={{
            background:
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.45) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)',
            transform: 'translate(30%, -30%) rotate(15deg)',
            filter: 'blur(80px)',
            opacity: 0.6,
            animationDelay: '-4s',
          }}
        />

        {/* Purple Side Spotlight */}
        <div
          className="absolute bottom-0 left-0 
            w-[800px] h-[800px] rounded-full animate-gradient"
          style={{
            background:
              'radial-gradient(circle at center, rgba(124, 58, 237, 0.35) 0%, rgba(124, 58, 237, 0.15) 50%, transparent 80%)',
            transform: 'translate(-30%, 30%) rotate(-15deg)',
            filter: 'blur(80px)',
            opacity: 0.5,
            animationDelay: '-7s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-gray-800/50">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-2xl font-bold text-white">
                CodeNote
              </a>
              <div className="flex items-center space-x-4">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Docs
                </a>
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="py-20 px-6 relative">
            <div className="container mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Analyze Code Repositories with AI
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
                Generate structured documentation and create project context for
                AI agents like ChatGPT
              </p>
              <button
                onClick={() => navigate(FRONTEND_ROUTES.DASHBOARD)}
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section
            id="features"
            className="py-20 px-6 bg-[#0B1120]/50 backdrop-blur-sm"
          >
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-white">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1f2e]/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all hover:shadow-lg group"
                  >
                    <div className="mb-4 transform group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-[#0B1120]/50 backdrop-blur-sm border-y border-gray-800/50">
            <div className="container mx-auto text-center">
              {/* <h2 className="text-4xl font-bold mb-6 text-white">Ready to Supercharge Your Development?</h2>
              <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-400">
                Start analyzing your repositories, generating documentation, and creating AI-ready context today.
              </p> */}
              {/* <button
                onClick={() => navigate(FRONTEND_ROUTES.DASHBOARD)}
                className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try CodeAnalyzer Now
              </button> */}
            </div>
          </section>

          {/* Routes Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-white">
                Explore Our Features
              </h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {Object.entries(FRONTEND_ROUTES).map(([key, path]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-4 bg-[#1a1f2e]/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 rounded-lg transition-all hover:shadow-lg"
                  >
                    <span className="text-lg font-medium text-gray-300">
                      {key}
                    </span>
                    <button
                      onClick={() => navigate(path)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Go to {path}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#0B1120]/80 backdrop-blur-sm text-white py-12 px-6 border-t border-gray-800/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">CodeAnalyzer</h3>
                <p className="text-gray-400">
                  Lightweight tool for analyzing code repositories and
                  generating documentation.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <p className="text-gray-400 mb-2">
                  Email: info@codeanalyzer.com
                </p>
                <p className="text-gray-400">Twitter: @codenote</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800/50 text-center text-gray-400">
              <p>&copy; 2024 CodeNote. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
