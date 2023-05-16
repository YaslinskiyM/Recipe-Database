const Category = require('./categorys');
const Recipe = require('./recipe');
const User = require('./user');
const Favorite = require('./favorite');
const Saved = require('./saved');
const Recipe_steps = require('./recipe_steps');

Recipe.haveMany(Recipe_steps, {
    foreignKey: 'recipe_id',
});

Recipe_steps.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
});


// ====================================================

User.hasMany(Recipe, {
    foreignKey: 'user_id',
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
});

// ====================================================

Category.hasMany(Recipe, {
    foreignKey: 'category_id',
});

Recipe.belongsTo(Category, {
    through: 'category_id',
});



// ====================================================

// User.belongsToMany(Recipe, {
//     through: 'favorite',
//     foreignKey: 'recipe_user_id',});

// Recipe.belongsToMany(User, {
//     through: 'favorite',
//     foreignKey: 'recipe_id',});

// // ====================================================

// User.belongsToMany(Recipe, {
//     through: 'saved',
//     foreignKey: 'recipe_user_id',});

// Recipe.belongsToMany(User, {
//     through: 'saved',
//     foreignKey: 'recipe_id',});


// ====================================================
module.exports = { Category, Recipe, User, Favorite, Saved,Recipe_steps};