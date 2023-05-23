const createRecipeForm = document.getElementById("recipe");
let selectedCategory;

const e = document.getElementById("categoryOptions");
function onChange() {
	selectedCategory = e.options[e.selectedIndex].value;
}
e.onchange = onChange;
onChange();

const addRecipeFormHandler = async (event) => {
	event.preventDefault();
	const recipe_name = document.getElementById("recipeName").value.trim();
	const recipe_description = document
		.getElementById("recipeDescription")
		.value.trim();
	const category_id = selectedCategory;
	const recipe_steps = combineSteps();
	console.log(category_id);

	console.log(recipe_name, recipe_description);
	// Send the recipe data to the server
	try {
		const response = await fetch("/api/recipes", {
			method: "POST",
			body: JSON.stringify({
				recipe_name,
				recipe_description,
				category_id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		//fetch recipe id by recipe name and description with params
		const recipe_id = await fetch(
			`/api/recipes/${recipe_name}/${recipe_description}`,
			{
				method: "GET",

				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const arr = await recipe_id.json();
		console.log(arr);
		//use the id to create recipe steps\
		try {
			for (let i = 0; i < recipe_steps.length; i++) {
				const response = await fetch("/api/recipe_steps", {
					method: "POST",
					body: JSON.stringify({
						recipe_id: arr.id,
						step: recipe_steps[i],
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
			}
		} catch (error) {
			console.error("Network error:", error);
		} finally {
			alert("Steps has been created");
		}

		console.log(response);
		if (response.ok) {
			// Handle successful recipe creation
			alert("Recipe has been created");
			document.location.replace('/users/home');
		} else {
			// Handle error response
			alert("Failed to create recipe");
		}
	} catch (error) {
		console.error("Network error:", error);
	}
};

//event listener for recipe steps then add to array
//each addstep click, a new input box is created
//then the addstep will disappear and a new addstep will appear after the new inputbox

const addStep = document.getElementById("addStep");

addStep.addEventListener("click", function (event) {
	event.preventDefault();
	const steps = document.getElementById("recipeSteps");
	console.log(steps);
	steps.innerHTML += `<textarea class = 'recipeSteps' maxlength="255" required style="width:190px;"></textarea>`;
});

function combineSteps() {
	const steps = document.getElementsByClassName("recipeSteps");
	let recipe_steps = [];
	for (let i = 0; i < steps.length; i++) {
		recipe_steps.push(steps[i].value);
	}
	return recipe_steps;
}

document
	.getElementById("recipe")
	.addEventListener("submit", addRecipeFormHandler);
