const $createRecipeForm = document.getElementById('createRecipeForm');

// form submission
$createRecipeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect the form data
    const formData = new FormData(createRecipeForm);
    const recipeData = Object.fromEntries(formData.entries());

    // TODO add validation on the form data?

    // Send the recipe data to the server
    try {
        const response = await fetch('/recipes', {
            method: 'POST',
            body: JSON.stringify(recipeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            // Handle successful recipe creation
            window.location.href = '/recipes/success'; // Redirect to success page
        } else {
            // Handle error response
            console.error('Failed to create recipe');
        }

        const data = await response.json();
        console.log(data);


    }
    catch (error) {
        console.error('Network error:', error);
    }

});

