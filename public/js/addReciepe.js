const $createRecipeForm = document.getElementById('recipe');
const $recipeName=document.getElementById('recipeDescription').value;
const $recipeDescription=document.getElementById('recipeName').value;
let selectedCategory;


const e = document.getElementById("categoryOptions");

function onChange() {

    selectedCategory= e.options[e.selectedIndex].value;
    
    
  }
  e.onchange = onChange;
 onChange();
 


// form submission
$createRecipeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect the form data
    

    // TODO add validation on the form data?

    // Send the recipe data to the server
    try {
        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: JSON.stringify({
                recipe_name: $recipeName, 
                recipe_description: $recipeDescription, 
                category_id: selectedCategory
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            // Handle successful recipe creation
            alert('recipe has been created')
            document.location.replace('/')
        } else {
            // Handle error response
            alert('Failed to create recipe');
        }

    }
    catch (error) {
        console.error('Network error:', error);
    }

});

