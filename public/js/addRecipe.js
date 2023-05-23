

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
  const recipe_steps = combineSteps();
  console.log(recipe_steps)

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
    
    const id = await fetch('/api/recipes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      });

    if (response.ok) {
      // Handle successful recipe creation
      alert('Recipe has been created');
      //document.location.replace('/users/home');
    } else {
      // Handle error response
      alert('Failed to create recipe');
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

//event listener for recipe steps then add to array
//each addstep click, a new input box is created
//then the addstep will disappear and a new addstep will appear after the new inputbox

const addStep = document.getElementById('addStep');

addStep.addEventListener('click', function (event) {
  event.preventDefault();
  const steps = document.getElementById('recipeSteps')
  console.log(steps)
  steps.innerHTML += `<textarea class = 'recipeSteps' maxlength="255" required style="width:190px;"></textarea>`
  
})

function combineSteps() {
  const steps = document.getElementsByClassName('recipeSteps');
  let recipe_steps = [];
  for (let i = 0; i < steps.length; i++) {
    recipe_steps.push(steps[i].value);
  }
  return recipe_steps;
}

document.getElementById('recipe').addEventListener('submit', addRecipeFormHandler);
