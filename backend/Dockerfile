# Use an official Python runtime as a base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend files to the working directory
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install flask pandas scikit-learn
RUN pip install flask-cors

# Expose the port your app runs on
EXPOSE 5000

ENTRYPOINT ["python"]
RUN python training.py
CMD ["recommendation.py"]
