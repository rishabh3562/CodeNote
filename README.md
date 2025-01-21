# CodeNote.ai

## Overview

This project is designed to analyze code repositories, generate accurate and structured documentation, and create context summaries for code flow that can be passed to agents like ChatGPT or Gemini. It provides features like repository fetching, automatic documentation generation, and prompt context creation for analysis, ensuring lightweight performance and high accuracy.

## Features

- **Repository Fetching**: Seamlessly pull repositories from GitHub, track file changes, and refetch only modified files.
- **Automatic Documentation**: Generate detailed and structured documentation for the entire codebase, following the file structure or custom formats.
- **Context Creation**: Analyze the codebase to generate context that summarizes functions, states, and actions, which can be passed to AI agents for further analysis.
- **Efficient & Lightweight**: Designed for performance and accuracy with minimal overhead.

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [TailwindCSS](https://tailwindcss.com/)
- **Backend**:
  - [Node.js](https://nodejs.org/en/)
  - [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)

## Folder Structure

```

|── backend/
|    |── api/
|    |    |── gateway/            # Handles routing, authentication, and API versioning
|    |    │   ├── src/
|    |    │   │   ├── routes/
|    |    │   │   ├── middlewares/
|    |    │   │   └── app.js
|    |    │   └── package.json
|    |    |── structure/
|    |── services/               # Microservices: user, order, product
|    │   ├── user/
|    │   │   ├── src/
|    │   │   │   ├── controllers/
|    │   │   │   ├── models/
|    │   │   │   ├── services/
|    │   │   │   ├── middlewares/
|    │   │   │   └── app.js
|    │   │   └── package.json
|    │   ├── llm/
|    │      ├── src/
|    │      │   ├── controllers/
|    │      │   ├── models/
|    │      │   ├── services/
|    │      │   ├── middlewares/
|    │      │   └── app.js
|    │      └── package.json
|    |
|    ├── /common
|    │    ├── /db
|    │    │    ├── dbManager.js       # Centralized DB management
|    │    │    ├── mongoClient.js      # MongoDB client setup
|    │    │    ├── cassandraClient.js  # Cassandra client setup (optional)
|    │    │    └── sqlClient.js        # SQL client setup (optional)
|    │    ├── /cache
|    │    └── /events
|    │    └── utils/              # Shared utilities and helper functions
|    ├── /configs
|    │    ├── dbConfig.js              # DB configuration
|    │    └── shardingConfig.js
|    ├── monitoring/             # Monitoring and logging
|    │   ├── metricsConfig.js    # Monitoring setup (Prometheus, Grafana)
|    │   └── logger.js           # Centralized logging
|    ├── docker-compose.yml
|    └── package.json
|
├── frontend/
    ├── public/
    ├── src/
    |    ├── assets/
    |    ├── components/         # Reusable React components
    |    ├── context/
    |    ├── hooks/
    |    ├── pages/              # Pages for Next.js or React routes
    |    ├── services/           # Frontend services (repo fetch, docs generation)
    |    ├── styles/             # Stylesheets (TailwindCSS)
    |    ├── utils
    |    ├── .env
    |    ├── App.css
    |    ├── App.jsx
    |    ├── index.css
    |    ├── main.jsx
    ├──.eslintrc.cjs
    ├──.gitignore
    ├──index.html
    ├──package-lock.json
    ├──package.json
    ├──postcss.config.js
    ├──README.md
    ├──tailwind.config.js
    └──vite.config.js

```
