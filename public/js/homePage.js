const $searchRecipeInput = document.getElementById('searchRecipe');
const $searchEnterButton = document.getElementById('searchEnter');
const $featuredRecipesDiv = document.getElementById('featured-recipes');

// search for reciepe and render results using handlebar template
$searchEnterButton.addEventListener('click', function(event) {
 
    event.preventDefault();
    var searchRecipeTerm = searchRecipeInput.value.toLowerCase();

    // Fetch the recipes array from the server
    fetch('/recipes')
      .then(response => response.json())
      .then(data => {
        // Filter the recipes based on the search term
        var filteredRecipes = data.filter(function(recipe) {
          return recipe.toLowerCase().includes(searchRecipeTerm);
        });

        // Render the filtered recipes using Handlebars template
        var templateSource = document.getElementById('featured-recipes-template').innerHTML;
        var template = Handlebars.compile(templateSource);
        var renderedHtml = template({ recipes: filteredRecipes });
        featuredRecipesDiv.innerHTML = renderedHtml;
      });
  });

// TODO  add reciepe

// TODO profile

// TODO nav


