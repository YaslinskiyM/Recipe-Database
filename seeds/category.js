const { Category } = require('../models');

const categoryData =

[
    {
        "category_name": "Chicken"
    },
    {
        "category_name": "Beef"
    },
    {
        "category_name": "Fish"
    },
    {
        "category_name": "Pork"
    },
    {
        "category_name": "Shellfish"
    }
]

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;