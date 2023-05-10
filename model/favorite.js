const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections');

class Favorite extends Model {}

Favorite.init(
  {
    /*PRIMARY KEY (`id`,`favorite_id`,`Favorite_idCREATE TABLE `Favorite` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `recipe_user_id` int NOT NULL,
  */
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    recipe_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorite',
  }
);

module.exports = Favorite;
