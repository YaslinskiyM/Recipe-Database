// "recipe_steps": "1 Prep the shrimp: Peel and rinse in cold water. 2. Place in a bowl with the olive oil, salt, pepper, and garlic and toss to combine. Cover and refrigerate until needed."

const { Recipe_steps } = require('../models');
const recipe_stepsData =
[
    {
        "recipe_id": 5,
        "step": "1 Prep the shrimp: Peel and rinse in cold water."
    },
    {
        "recipe_id": 5,
        "step": "2. Place in a bowl with the olive oil, salt, pepper, and garlic and toss to combine."
    },
    {
        "recipe_id": 5,
        "step": "Cover and refrigerate until needed."
    },
    {
        "recipe_id": 4,
        "step": "1. Heat oiled skillet."
    },
    {
        "recipe_id": 4,
        "step": "2. Add pork chops."
    },
    {
        "recipe_id": 4,
        "step": "3. Cook pork chops 3-4 minutes per side until done."
    },
    {
        "recipe_id": 4,
        "step": "4. Serve."
    },
    {
        "recipe_id": 3,
        "step": "1 Prepare the mango salsa: Combine the mango, red onion, cilantro, lime juice, and olive oil in a medium bowl."
    },
    {
        "recipe_id": 3,
        "step": "Season to taste with salt and pepper. Set aside at room temperature while you prepare the fish."
    },
    {
        "recipe_id": 2,
        "step": "1. Pat dry beef cubes."
    },
    {
        "recipe_id": 2,
        "step": "2. Heat oil in large saute pan."
    },
    {
        "recipe_id": 2,
        "step": "3. Brown meat."
    },
    {
        "recipe_id": 2,
        "step": "4. Add vegetables and cook until tender."
    },
    {
        "recipe_id": 2,
        "step": "5. Add beef broth and simmer for 1 hour."
    },
    {
        "recipe_id": 1,
        "step": "1. Pound chicken cutlets thin."
    },
    {
        "recipe_id": 1,
        "step": "2. Dredge chicken in flour, dip in egg, then in breadcrumbs."
    },
    {
        "recipe_id": 1,
        "step": "3. Fry chicken in oil until brown."
    },
    {
        "recipe_id": 1,
        "step": "4. Top with tomato sauce and cheese and bake until cheese is melted."
    }
]

const seedRecipeSteps = () => Recipe_steps.bulkCreate(recipe_stepsData);

module.exports = seedRecipeSteps;