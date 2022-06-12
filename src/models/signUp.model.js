'use strict';

const users = (Sequelize, DataTypes) => {
  const users = Sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return users;
}
module.exports = users;