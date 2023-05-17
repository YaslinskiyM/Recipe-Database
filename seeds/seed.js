const seedCategories = require('./category');
const seedUser = require('./user');
const seedRecipe = require('./recipe');

const sequelize = require('../config/connection');
const seedRecipeSteps = require('./recipe_steps');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedUser();
  console.log('\n----- User SEEDED -----\n');

  await seedRecipe();
  console.log('\n----- Recipe SEEDED -----\n');

  await seedRecipeSteps();
  console.log('\n----- Steps SEEDED -----\n');

  process.exit(0);
};

seedAll();