const { Recipe } = require('../models');
const recipeData =
[
    {
        "recipe_name": "Chicken Parmesan",
        "recipe_description": "Chicken Parmesan is a classic for a reason! Chicken cutlets, breaded and fried, smothered with tomato sauce, and covered with mozzarella and Parmesan cheeses are so good. Serve with pasta or on a roll.",
        "user_id" : "3",
        "category_id": "1"
        // "recipe_steps": "1. Pound chicken cutlets thin. 2. Dredge chicken in flour, dip in egg, then in breadcrumbs. 3. Fry chicken in oil until brown. 4. Top with tomato sauce and cheese and bake until cheese is melted. "
    },
    {
        "recipe_name": "Beef Stew",
        "recipe_description": "Hearty beef stew recipe with loads of tender beef, vegetables and a rich broth. This classic beef stew recipe is easy to make in one-pot.",
        // "recipe_steps": "1. Pat dry beef cubes. 2. Heat oil in large saute pan. 3. Brown meat. 4. Add vegetables and cook until tender. 5. Add beef broth and simmer for 1 hour. "
        "user_id" : "3",
        "category_id": "2"
    },
    {
        "recipe_name": "Fish Tacos",
        "recipe_description": "Easy grilled fish tacos with a fresh mango salsa and chipotle aioli sauce. These fish tacos are bursting with fresh flavor and are a breeze to make.",
        "user_id" : "3",
        "category_id": "3"
        // "recipe_steps": "1 Prepare the mango salsa: Combine the mango, red onion, cilantro, lime juice, and olive oil in a medium bowl. Season to taste with salt and pepper. Set aside at room temperature while you prepare the fish."
    },
    {
        "recipe_name": "Pork Chops",
        "recipe_description": "Pork chops cooked low and slow become so tender and juicy—and so do the cabbage and apples that cook with them. Serve with a cold beer and imagine yourself at a biergarten in Germany.",
        // "recipe_steps": "1. Heat oiled skillet. 2. Add pork chops. 3. Cook pork chops 3-4 minutes per side until done. 4. Serve."
        "user_id" : "1",
        "category_id": "4"
    },
    {
        "recipe_name": "Shrimp Scampi",
        "recipe_description": "Classic Shrimp Scampi Recipe with lemon, garlic, butter, olive oil, and lots of fresh parsley. Serve with pasta or rice.",
        "user_id" : "1",
        "category_id": "3"
    },

    {
        "recipe_name": "Shrimp Cocktail",
        "recipe_description": " Quick, tangy appetizer with cooked shrimp and zesty cocktail sauce.",
        "user_id" : "2",
        "category_id": "3"
    },
    {
        "recipe_name": "Teriyaki Chicken",
        "recipe_description": "Sweet and savory chicken glazed with a homemade teriyaki sauce, served with steamed rice and vegetables.",
        "user_id" : "2",
        "category_id": "1"
    },
]

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;