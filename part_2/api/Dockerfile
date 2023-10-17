# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install any needed dependencies
RUN npm install

# Expose the port that the API will listen on
EXPOSE 3000

# Start the API
CMD [ "npm", "start" ]
