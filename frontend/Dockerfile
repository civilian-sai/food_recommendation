# Use an official Nginx image as a base image
FROM nginx:alpine

# Copy the frontend files to the default Nginx public directory
COPY . /usr/share/nginx/html

# Expose the port Nginx listens on
EXPOSE 80

# Command to run Nginx (automatically starts when the container starts)
CMD ["nginx", "-g", "daemon off;"]
