const Category = require('./categorys');
const Recipe = require('./recipe');
const User = require('./user');
const Favorite = require('./favorite');
const Saved = require('./saved');
const Recipe_steps = require('./recipe_steps');

Recipe.hasMany(Recipe_steps, {
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

User.hasMany(Favorite, 
    { foreignKey: 'recipe_user_id' });

Recipe.hasMany(Favorite, { foreignKey: 'recipe_id' });

Favorite.belongsTo(Recipe, { foreignKey: 'recipe_id' });

Favorite.belongsTo(User, { foreignKey: 'recipe_user_id' });


// ====================================================

User.hasMany(Saved, 
    { foreignKey: 'recipe_user_id' });

Recipe.hasMany(Saved, { foreignKey: 'recipe_id' });

Saved.belongsTo(Recipe, { foreignKey: 'recipe_id' });

Saved.belongsTo(User, { foreignKey: 'recipe_user_id' });


// ====================================================
module.exports = { Category, Recipe, User, Favorite, Saved,Recipe_steps};