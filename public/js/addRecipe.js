const createRecipeForm = document.getElementById('recipe');
let selectedCategory;

const e = document.getElementById("categoryOptions");
function onChange() {
  selectedCategory = e.options[e.selectedIndex].value;
}
e.onchange = onChange;
onChange();

const addRecipeFormHandler = async (event) => {
  event.preventDefault();
  const recipe_name = document.getElementById('recipeName').value.trim();
  const recipe_description = document.getElementById('recipeDescription').value.trim();
  const category_id=selectedCategory;

  console.log(recipe_name,recipe_description)
  // Send the recipe data to the server
  try {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({
        recipe_name,
        recipe_description
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // Handle successful recipe creation
      alert('Recipe has been created');
      document.location.replace('/users/home');
    } else {
      // Handle error response
      alert('Failed to create recipe');
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

document.getElementById('recipe').addEventListener('submit', addRecipeFormHandler);
