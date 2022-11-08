'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gig.belongsTo(models.Owner, {
        foreignKey: 'owner_id',
        as: 'owner'
      })
      Gig.hasMany(models.Application, {
        foreignKey: 'gig_id',
        as: 'applications'
      })
    }
  }
  Gig.init({
    owner_id: DataTypes.INTEGER,
    location: DataTypes.STRING,
    fee: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    location_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gig',
  });
  return Gig;
};