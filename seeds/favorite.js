const { Favorite } = require('../models');

const favoriteData =
[{
    "user_id": "1",
    "recipe_user_id": "3"
},
{
    "user_id": "1",
    "recipe_user_id": "4"
},
{
    "user_id": "5",
    "recipe_user_id": "1"
},
{
    "user_id": "5",
    "recipe_user_id": "2"
},
    ]
const favoriteSaved = () => Favorite.bulkCreate(favoriteData);
module.exports = favoriteSaved;