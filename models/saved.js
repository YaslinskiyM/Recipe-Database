const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections');

class Saved extends Model {}

Saved.init(
  {
    /*PRIMARY KEY (`id`,`favorite_id`,`saved_idCREATE TABLE `saved` (
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
    modelName: 'saved',
  }
);

module.exports = Saved;