'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idUser",
        },
      })

      user.belongsToMany(models.book, {
        as: "markedBook",
        through: {
          model: "bookmark",
          as: "bridge",
        },
        foreignKey: "idUser",
      });

      user.hasMany(models.transaction, {
        as: "approverTransaction",
        foreignKey: {
          name: "idAdmin",
        },
      });

      user.hasMany(models.transaction, {
        as: "subsciberTransaction",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};