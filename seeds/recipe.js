const { Recipe } = require('../models');
const recipeData =
[
    {
        "recipe_name": "Chicken Parmesan",
        "recipe_description": "Chicken Parmesan is a classic for a reason! Chicken cutlets, breaded and fried, smothered with tomato sauce, and covered with mozzarella and Parmesan cheeses are so good. Serve with pasta or on a roll.",
        "recipe_steps": "1 Pound chicken breasts until thin: Place the chicken breast halves one at a time between sheets of plastic wrap or wax paper" /*. Pound with a meat pounder until they are thin and expanded to 2 to 3 times their original size. (Or you can use a slicing attachment on a food processor to slice the chicken breasts thin.)*/
    },
    {
        "recipe_name": "Beef Stew",
        "recipe_description": "Hearty beef stew recipe with loads of tender beef, vegetables and a rich broth. This classic beef stew recipe is easy to make in one-pot.",
        "recipe_steps": "1 Brown the beef: Pat dry the cubes of beef with paper towels. Heat 2 Tbsp of oil in a large sauté pan over medium high heat. " /*Working in batches so that the pan is not crowded, brown the meat on all sides. Transfer the browned meat to a large pot."*/
    },
    {
        "recipe_name": "Fish Tacos",
        "recipe_description": "Easy grilled fish tacos with a fresh mango salsa and chipotle aioli sauce. These fish tacos are bursting with fresh flavor and are a breeze to make.",
        "recipe_steps": "1 Prepare the mango salsa: Combine the mango, red onion, cilantro, lime juice, and olive oil in a medium bowl. Season to taste with salt and pepper. Set aside at room temperature while you prepare the fish."
    },
    {
        "recipe_name": "Pork Chops",
        "recipe_description": "Pork chops cooked low and slow become so tender and juicy—and so do the cabbage and apples that cook with them. Serve with a cold beer and imagine yourself at a biergarten in Germany.",
        "recipe_steps": "1 Brown the pork chops: Heat the olive oil in a large, thick-bottomed skillet over medium-high heat. Pat the pork chops dry with" /* paper towels. Sprinkle salt over the pork chops on both sides. When the oil is hot, swirl in the pan to coat the bottom and then add the pork chops. Brown them for 3-4 minutes on each side."*/
    },
    {
        "recipe_name": "Shrimp Scampi",
        "recipe_description": "Classic Shrimp Scampi Recipe with lemon, garlic, butter, olive oil, and lots of fresh parsley. Serve with pasta or rice.",
        "recipe_steps": "1 Prep the shrimp: Peel and devein the shrimp. Rinse in cold water and drain. Place in a bowl with the olive oil, salt, pepper, and garlic and toss to combine. Cover and refrigerate until needed."
    }
]

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;