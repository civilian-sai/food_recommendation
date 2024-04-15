<h1 align="center">Food Recommendation System</h1>

  <h4>A food recommendation web application using content-based approach with Scikit-Learn, FlaskAPI and Node JS.</h4>
</div>
# Food recommendation

It recommends the dishes as per some nutritious values entered by the user. The values that the user eneters are:   
=>veg/non-veg   
=>calories   
=>fat   
=>saturated_fat   
=>cholesterol   
=>sodium   
=>carbohydrate    
=>fiber   
=>sugar   
=>protein

### How food is recommended ?
A food recommendation system utilizing a content-based approach plays a pivotal role in encouraging healthier eating habits. This method leverages data on the nutritional profiles and ingredients of various foods to offer personalized suggestions to users. An important strength of this approach is its ability to accommodate individual dietary restrictions and preferences, such as allergies or specific food choices. By delivering tailored recommendations, a content-based food recommendation system empowers users to make informed decisions about their meals, thereby enhancing their overall wellness. Moreover, by introducing a diverse array of nutritious options, it facilitates the exploration of new and beneficial foods, broadening culinary experiences and alleviating monotony in meal choices. This holistic approach to diet optimization can contribute significantly to improved health outcomes over time.

### What is a content-based recommendation system?
A content-based recommendation engine is a specialized system designed to suggest items based on their inherent characteristics or content, rather than relying solely on user interactions or collaborative filtering. This technology operates by examining the unique attributes of items, which can include textual descriptions, images, audio features, or other metadata. By analyzing these content elements, the engine can identify underlying patterns or distinctive features associated with each item.

## :computer:Development
### Model developement
The recommendation engine has been constructed using the Nearest Neighbors algorithm, a type of unsupervised learning method utilized for performing neighbor searches efficiently. This algorithm serves as a unified interface that can access three distinct nearest neighbors algorithms: BallTree, KDTree, and a brute-force approach based on functions within sklearn.metrics.pairwise. Specifically, for our application, we opted for the brute-force algorithm employing cosine similarity due to its rapid computation, which is well-suited for smaller datasets.   
KNN's simplicity and intuitive nature make it attractive for certain recommendation system applications, especially when dealing with smaller datasets or when interpretability and transparency are prioritized. However, its performance can be affected by the curse of dimensionality when dealing with high-dimensional data. In such cases, preprocessing techniques like dimensionality reduction may be necessary to enhance its efficiency and effectiveness.

$$cos(theta) = (A * B) / (||A|| * ||B||)$$   

## Flow of Project   
### Frontend:   
First the user registers his details in "register.html" file and then he gets logged in using "login.html" and it validates the user and allow him into main "index.html" file where he enters the details regarding the nutritituous values   

### Database:   
Here the tables are created and the user details are stored and validated and in further it also stores the name of the dishes which the user want to store under his email in a table format   

### Backend:
Here the recommendation is done, that is whole logic works here and returns the dishes according to the trained model.     

## Flowchart   
<div align= "center"><img src="Screenshot (86).png" /></div>

   


   
## Dataset

Get the dataset from kaggle and save it in backend folder and the below is the link, enter the link and download recipes.csv

```bash
  https://www.kaggle.com/code/tanishqdublish/diet-recommendation-system-preprocessing/input
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/civilian-sai/food_recommendation.git
```

To run without docker:

```bash
  cd backend
  python training.py
  pyton recommendation.py

  cd ..
  cd database
  npm init -y
  npm install
  node database.js

  cd..
  cd frontend
  http://localhost:5500/register.html (in browser)
```

To run with docker

```bash
  docker-compose up --build (after getting all your .pkl, json files)

  http://localhost:5500/register.html (in browser)
```

