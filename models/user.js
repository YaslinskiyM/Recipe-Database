const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  async checkPassword(password) {
  return bcrypt.compare(password, this.password);
}}

User.init(
  {
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);
User.addHook('beforeCreate', async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;


/*

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `login_id` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `favorite_id` int NOT NULL,
  `saved_id` int NOT NULL,
  PRIMARY KEY (`id`,`favorite_id`,`saved_id`),
  KEY `fk_user_favorite1_idx` (`favorite_id`),
  KEY `fk_user_saved1_idx` (`saved_id`),
  CONSTRAINT `fk_user_favorite1` FOREIGN KEY (`favorite_id`) REFERENCES `favorite` (`id`),
  CONSTRAINT `fk_user_saved1` FOREIGN KEY (`saved_id`) REFERENCES `saved` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
*/