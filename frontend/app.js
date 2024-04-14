$(document).ready(function() {
    // Initialize an array to store all recipes
    var recipesToSave = [];

    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
        // Display greeting message
        const greetingContainer = $('#greetingContainer');
        const greetingMessage = `<p>Welcome, ${userEmail}!</p>`;
        greetingContainer.html(greetingMessage);
    }

    var getRecordsButton = $('<button class="btn btn-info btn-records">Get Records</button>');

    // Handle click event for Get Records button
    getRecordsButton.click(function() {
        var userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            records(userEmail); // Retrieve and display saved recipe records
        } else {
            console.error('User email is null or undefined.');
            alert('User email is not available. Please log in again.');
        }
    });

    // Append the Get Records button to the header container
    $('#header').append(getRecordsButton);

    // Handle form submission
    $('#recommendation-form').submit(function(event) {
        event.preventDefault();

        // Get form data
        var formData = {
            'calories': $('#calories').val(),
            'fat': $('#fat').val(),
            'saturated_fat': $('#saturated_fat').val(),
            'cholesterol': $('#cholesterol').val(),
            'sodium': $('#sodium').val(),
            'carbohydrate': $('#carbohydrate').val(),
            'fiber': $('#fiber').val(),
            'sugar': $('#sugar').val(),
            'protein': $('#protein').val(),
            'diet': $('input[name="diet"]:checked').val()
        };

        // Send POST request to backend for recommendations
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/recommendation',
            data: formData,
            success: function(response) {
                displayRecommendations(response); // Display recommendations
            },
            error: function(xhr, status, error) {
                console.error('AJAX request failed:', error);
                handleError(xhr.responseJSON.error);
            }
        });
    });

    // Function to display recommendations
    function displayRecommendations(recipes) {
        var recommendationsContainer = $('#recommendations');
        recommendationsContainer.empty();

        // Loop through each recipe and create cards
        for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i];
            var defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOt2m-NOqLUy6nzH9fFoHiXXzntfJ23bVKQ&s';

            // Create card element
            var card = $('<div class="card"></div>');

            // Create card body
            var cardBody = $('<div class="card-body"></div>');

            var imgElement = $('<img class="card-img-top">');
            imgElement.attr('src', defaultImageUrl); // Set default image URL
            imgElement.appendTo(card);

            // Add recipe name to card body
            var nameElement = $('<h3 class="card-title">' + recipe.Name + '</h3>');
            nameElement.appendTo(cardBody);

            // Add ingredients list to card body
            var ingredientsElement = $('<p><strong>Ingredients:</strong> ' + recipe.RecipeIngredientParts + '</p>');
            ingredientsElement.appendTo(cardBody);

            // Add button to view details
            var detailsButton = $('<button class="btn btn-primary">View Details</button>');
            detailsButton.click((function(recipe) {
                return function() {
                    showRecipeDetails(recipe); // Show detailed recipe information
                };
            })(recipe));
            detailsButton.appendTo(cardBody);

            // Append card body to card
            cardBody.appendTo(card);

            // Append card to recommendations container
            card.appendTo(recommendationsContainer);

            // Push recipe into array to save later
            recipesToSave.push(recipe);
        }

        // Add a single save button after displaying all recommendations
        var saveAllButton = $('<button class="btn btn-success">Save All Recipes</button>');
        saveAllButton.click(function() {
            var userEmail = localStorage.getItem('userEmail'); // Retrieve userEmail from localStorage

            if (userEmail) {
                // Save all recipes under user's email
                for (var j = 0; j < recipesToSave.length; j++) {
                    saveRecipe(userEmail, recipesToSave[j].Name);
                }
            } else {
                console.error('User email is null or undefined.');
                alert('User email is not available. Please log in again.');
            }
        });    

        // Append save all button to recommendations container
        recommendationsContainer.append(saveAllButton);
        
    }


   // Function to handle retrieval of recipe records based on user's email
function records(userEmail) {
    $.ajax({
        type: 'POST',
        url: 'http://database:3000/records',
        contentType: 'application/json',
        data: JSON.stringify({ userEmail: userEmail }),
        success: function(response) {
            if (response && response.length > 0) {
                // Display retrieved recipes in an alert
                alert('Saved Recipe Names:\n\n' + response.join('\n'));
            } else {
                alert('No saved recipes found for this user.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error retrieving records:', error);
            alert('Failed to retrieve recipe records. Please try again.');
        }
    });
}


    // Function to save recipe under user's email
    function saveRecipe(userEmail, recipeName) {
        // Send POST request to backend to save recipe under user's email
        $.ajax({
            type: 'POST',
            url: 'http://database:3000/saveRecipe',
            contentType: 'application/json',  // Specify JSON content type
            data: JSON.stringify({            // Stringify data object
                userEmail: userEmail,
                recipeName: recipeName
            }),
            success: function(response) {
                console.log('Recipe saved successfully:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error saving recipe:', error);
                alert('Failed to save recipe. Please try again.');
            }
        });
    }

    // Function to display detailed recipe information
    function showRecipeDetails(recipe) {
        // Display recipe details in a modal or expanded view
        alert(' Recipe Details: ' +
            '\nName: ' + recipe.Name +
            '\nIngredients: ' + recipe.RecipeIngredientParts +
            '\nCalories: ' + recipe.Calories +
            '\nFat: ' + recipe.FatContent +
            '\nSaturated Fat: ' + recipe.SaturatedFatContent +
            '\nCholesterol: ' + recipe.CholesterolContent +
            '\nSodium: ' + recipe.SodiumContent +
            '\nCarbohydrates: ' + recipe.CarbohydrateContent +
            '\nFiber: ' + recipe.FiberContent +
            '\nSugar: ' + recipe.SugarContent +
            '\nProtein: ' + recipe.ProteinContent);
    }

    // Function to handle errors
    function handleError(errorMessage) {
        alert('Error: ' + errorMessage);
    }
});
