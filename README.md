To run the code without docker follow the below steps after cloning my repository and remove docker files if needed   

1.Enter into backend folder and now save a file named recepis.csv from "https://www.kaggle.com/code/tanishqdublish/diet-recommendation-system-preprocessing/input" and then train the model by running 
training.py, and in the same folders you will be getting the .pkl and .npy files and now rum the recommendation.py, it starts the server to listen the requests.

2.Now open the database folder and run the following commands and make sure you have node installed:   
"   
  => npm init -y   
  => npm install   
"
these will be creating json files and node modules in that folder and also install mysql and create the database and table and columns as mentioned in code.   
Now run the command "node database.js", it will start server to listen to the requests       

3.Now open frontend folder on local host run register.html and the flow will be continued.      



!!!! To run the code with docker       

run the following command   
docker-compose up --build   

And open the frontend in the browser using http://localhost:5500/register.html
