const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections');

class Recipe_steps extends Model {}

Recipe_steps.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        step: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
      }
)

module.exports = Recipe_steps;