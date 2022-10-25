'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Application.belongsTo(models.Gig, { foreignKey: 'gigId', as: 'gig' })
    }
  }
  Application.init({
    gigId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    performer_name: DataTypes.STRING,
    portofolio_link: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};