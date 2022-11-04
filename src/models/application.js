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
      Application.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
      Application.belongsTo(models.Gig, {
        foreignKey: 'gig_id',
        as: 'gig'
      })
    }
  }
  Application.init({
    gig_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    performer_name: DataTypes.STRING,
    portofolio_link: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};