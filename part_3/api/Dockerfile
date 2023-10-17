# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the application code to the working directory
COPY . .

# Install any needed dependencies
RUN npm install

# Start the API
CMD [ "npm", "start" ]
