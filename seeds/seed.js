const sequelize = require('../config/connection');
const { user, category, recipe } = require('../models'); //saved and favorite?

const recipeSeedData = require('./recipe.json');
const categorySeedData = require('./category.json');
const userSeedData = require('./user.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const users = await user.bulkCreate(userSeedData, {
        returning: true,
    });
    
    const categories = await category.bulkCreate(categorySeedData, {
        returning: true,
    });
    
    const recipes = await recipe.bulkCreate(recipeSeedData, {
        returning: true,
    });
    
    process.exit(0);
    }