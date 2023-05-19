const displayRecipe = document.getElementById('displayRecipe');// This is the div where the recipe will be displayed

async function getRecipe() { // This function will get the recipe from the database
    try {
        const response = await fetch('/recipe/recipeID '); // This is the route to the recipe   
        if (response.ok) { 
        const recipeData = await response.json(); // This will convert the response to JSON
        displayRecipe(recipeData); 
        } else {
            console.error('Failed to retrieve recipe'); 
        }
    } catch (error) {   
        console.error('Network error', error); 
    }
}

function displayRecipe(recipeData) { 
    console.log(recipeData);
}