# Use the official Node.js image as the base image
FROM node:18

# ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

# Install the application dependencies
RUN npm install
# RUN npm install --production && npm run build-prod

# Copy the application files into the working directory
COPY . .

RUN npx update-browserslist-db@latest

RUN npm run build-prod

EXPOSE 8080

# Define the entry point for the container
# CMD ["npm", "run", "prod"]
CMD ["npm", "run", "start"]
