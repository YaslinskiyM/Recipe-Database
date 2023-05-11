const sequelize = require('../config/connection');
const { user, category, recipe } = require('../models'); //saved and favorite?

const recipeSeedData = require('./recipe.json');
const categorySeedData = require('./category.json');
const userSeedData = require('./user.json');
