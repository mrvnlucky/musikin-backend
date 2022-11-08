'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Application, {
        foreignKey: 'user_id',
        as: 'applications'
      })
    }
  }
  User.init({
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_phone: DataTypes.STRING,
    user_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};