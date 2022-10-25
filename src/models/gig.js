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
      Gig.belongsTo(models.Owner, { foreignKey: 'ownerId', as: 'owner' })
      Gig.hasMany(models.Application, { as: 'applications' })
    }
  }
  Gig.init({
    ownerId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    fee: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    location_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gig',
  });
  return Gig;
};