
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




## dataset

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
  docker-compose up --build

  http://localhost:5500/register.html (in browser)
```

