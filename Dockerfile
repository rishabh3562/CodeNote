# Frontend
FROM node:18 AS frontend
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend
FROM node:18 AS backend
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend /app/build ./public
EXPOSE 5000
CMD ["node", "app.js"]
