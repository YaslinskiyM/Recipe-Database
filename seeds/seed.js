const seedCategories = require('./category');
const seedUser = require('./user');
const seedRecipe = require('./recipe');

const sequelize = require('../config/connections');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedUser();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedRecipe();
  console.log('\n----- TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();