<h1 align="center">Food Recommendation System</h1>  

## Food recommendation


### How food is recommended ?
A food recommendation system utilizing a content-based approach plays a pivotal role in encouraging healthier eating habits. This method leverages data on the nutritional profiles and ingredients of various foods to offer personalized suggestions to users. An important strength of this approach is its ability to accommodate individual dietary restrictions and preferences, such as allergies or specific food choices. By delivering tailored recommendations, a content-based food recommendation system empowers users to make informed decisions about their meals, thereby enhancing their overall wellness. Moreover, by introducing a diverse array of nutritious options, it facilitates the exploration of new and beneficial foods, broadening culinary experiences and alleviating monotony in meal choices. This holistic approach to diet optimization can contribute significantly to improved health outcomes over time.

### What is a content-based recommendation system?
A content-based recommendation engine is a specialized system designed to suggest items based on their inherent characteristics or content, rather than relying solely on user interactions or collaborative filtering. This technology operates by examining the unique attributes of items, which can include textual descriptions, images, audio features, or other metadata. By analyzing these content elements, the engine can identify underlying patterns or distinctive features associated with each item.

## :computer:Development
### Model developement
The recommendation engine has been constructed using the Nearest Neighbors algorithm, a type of unsupervised learning method utilized for performing neighbor searches efficiently. This algorithm serves as a unified interface that can access three distinct nearest neighbors algorithms: BallTree, KDTree, and a brute-force approach based on functions within sklearn.metrics.pairwise. Specifically, for our application, we opted for the brute-force algorithm employing cosine similarity due to its rapid computation, which is well-suited for smaller datasets.   
KNN's simplicity and intuitive nature make it attractive for certain recommendation system applications, especially when dealing with smaller datasets or when interpretability and transparency are prioritized. However, its performance can be affected by the curse of dimensionality when dealing with high-dimensional data. In such cases, preprocessing techniques like dimensionality reduction may be necessary to enhance its efficiency and effectiveness.

$$cos(theta) = (A * B) / (||A|| * ||B||)$$    

## Technologies used:   
Docker   
Flask API   
MySQL   
Node JS   
HTML, CSS, JS   
AJAX model   
Python   
Scikit-Learn

## Flow of Project   
### Frontend:   
First the user registers his details in "register.html" file and then he gets logged in using "login.html" and it validates the user and allow him into main "index.html" file where he enters the details regarding the nutritituous values   

### Database:   
Here the tables are created and the user details are stored and validated and in further it also stores the name of the dishes which the user want to store under his email in a table format.   

### MySQL:
In docker-compose file we are pulling an official image of MySQL from the dockerhub, and created a database by configuring it with the help of node js, which is present in backend

### Backend:
Here the recommendation is done, that is whole logic works here and returns the dishes according to the trained model.   

  

## Flowchart     

### With Docker   
<div align= "center"><img src="Screenshot (91).png" /></div>    

## Why Docker ?   
By using Docker, you can ensure that the environment in which the application is exactly the same as the environment in which it was built, which can help prevent unexpected issues and improve model performance. It mainly prevents the situattions lie "it works in your system, but doesn't work in my system". Additionally, Docker allows for easy scaling and management of the deployment, making it a great choice for larger machine learning projects.   

## Dataset

Get the dataset(recipes.csv) from kaggle or google drive link and save it in backend folder and the below is the link, enter the link and download recipes.csv

```bash
  https://www.kaggle.com/code/tanishqdublish/diet-recommendation-system-preprocessing/input
```
Drive link: https://drive.google.com/drive/folders/1y_9G-yE9NlRMDxRsfYg0d-0gQCxEBREC?usp=drive_link
    
## Run Locally

### Clone the project

```bash
  git clone https://github.com/civilian-sai/food_recommendation.git
```
Open the food_recommendation folder.  

```bash
cd food_recommendation
```

### Steps to do before running by using docker    
```bash
//enter into backend
cd backend

//save the recipes.csv file in this folder by using the above link or download from the google drive provided.

//now run training.py to get the .pkl, .npy files which stores the traning instances objects and trained data
python training.py
```
you can see the following highlighted files will get included into your backend directory   
<div align= "center"><img src="Screenshot (87).png" /></div>  
   


Come to the directory where the docker-compose file is present.


To run with docker

```bash
  docker-compose up --build
 
```
```bash
  // use below URL in the browser to get started.
  http://localhost:5500/register.html 
```

## Problems that may arise:   

### 1. Dataset(recipes.csv) not found:   

This error arises because in my git repository, I was not able to upload my dataset because github doesn't allow oversized data. So, I request you guys to kindly download  it from the google drive link or kaggle link which was  provided in this document or in my readme file. And make sure that this dataset is saved in the backend folder.   

And after downloading it run the training.py in the terminal by using the following command to get some files which are needed for further process:   
 ```bash
//python training.py (this will generates some .pkl and .npy files)   
```

After this you can run docker-compose up in the directory where the docker-compose file is present.   


### 2. Registration Failed:     

This error arises because of the loading mechanism of containers. Because in my project first the MySQL container should be created and then nodejs container should be created, and only then it can make connections with the MySQL database but this happens in reverse, where first node js container is created and then MySQL container. (this happens because in docker the containers are created parallelly and low size containers will get created first). So to rectify this error all you need to do is, in docker desktop app, you need to restart the node js container.   
