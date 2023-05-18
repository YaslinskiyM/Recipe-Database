const { Favorite } = require('../models');

const favoriteData =
[{
    "recipe_user_id": "1",
    "recipe_id": "3"
},
{
    "recipe_user_id": "1",
    "recipe_id": "4"
},
{
    "recipe_user_id": "5",
    "recipe_id": "1"
},
{
    "recipe_user_id": "5",
    "recipe_id": "2"
},
    ]
const favoriteSaved = () => Favorite.bulkCreate(favoriteData);
module.exports = favoriteSaved;