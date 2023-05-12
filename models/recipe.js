const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connections');

class Recipe extends Model {}

Recipe.init(
    /*
    CREATE TABLE `recipe` (
  `id` int NOT NULL,
  `recipe_name` varchar(45) NOT NULL,
  `recipe_description` varchar(45) DEFAULT NULL,
  `recipe_steps` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `keywords` varchar(45) DEFAULT NULL,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`,`user_id`,`category_id`),
  KEY `fk_recipe_user_idx` (`user_id`),
  KEY `fk_recipe_category1_idx` (`category_id`),
  CONSTRAINT `fk_recipe_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_recipe_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

    */
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_name: {
            
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        recipe_steps: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        keywords: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
      }
)

module.exports = Recipe;