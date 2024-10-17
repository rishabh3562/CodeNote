# Step 1: Use an official Node.js image as the base
FROM node:18

# Step 2: Set the working directory inside the container to the frontend directory
WORKDIR /app/frontend

# Step 3: Copy package.json and package-lock.json from the frontend folder
COPY frontend/package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application files from the frontend folder
COPY frontend/ ./

# Step 6: Build the Vite app for production
RUN npm run build

# Step 7: Expose the port that Vite will use (default is 5173)
EXPOSE 5173

# Step 8: Start the Vite server
CMD ["npm", "run", "preview", "--", "--host"]

