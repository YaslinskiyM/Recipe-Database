/* some random data for saved table*/
const { Saved } = require('../models');
const savedData =
[{
    "recipe_user_id": "1",
    "recipe_id": "1"
},
{
    "recipe_user_id": "1",
    "recipe_id": "2"
},
{
    "recipe_user_id": "5",
    "recipe_id": "3"
},
{
    "recipe_user_id": "5",
    "recipe_id": "4"
},
    ]
const seedSaved = () => Saved.bulkCreate(savedData);
module.exports = seedSaved;