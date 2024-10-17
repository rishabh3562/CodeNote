# Frontend
FROM node:18 AS frontend
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Backend
FROM node:18 AS backend
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ ./
COPY --from=frontend /app/build ./public
EXPOSE 5000
CMD ["node", "app.js"]
