/* some random data for saved table*/
const { Saved } = require('../models');
const savedData =
[{
    "user_id": "1",
    "recipe_user_id": "1"
},
{
    "user_id": "1",
    "recipe_user_id": "2"
},
{
    "user_id": "5",
    "recipe_user_id": "3"
},
{
    "user_id": "5",
    "recipe_user_id": "4"
},
    ]
const seedSaved = () => Saved.bulkCreate(savedData);
module.exports = seedSaved;