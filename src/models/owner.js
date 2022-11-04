'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Owner.hasMany(models.Gig, {
        foreignKey: 'owner_id',
        as: 'gigs'
      })
    }
  }
  Owner.init({
    owner_name: DataTypes.STRING,
    owner_email: DataTypes.STRING,
    owner_password: DataTypes.STRING,
    owner_phone: DataTypes.STRING,
    owner_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Owner',
  });
  return Owner;
};