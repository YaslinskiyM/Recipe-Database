const router = require('express').Router();
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const favoriteRoutes = require('./favorite-routes');
const categoryRoutes = require('./category-routes');
const savedRoutes = require('./saved-routes');
const recipe_steps_routes = require('./recipe_steps_routes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/categories', categoryRoutes);
router.use('/saved', savedRoutes);
router.use('/recipe_steps', recipe_steps_routes);

module.exports = router;