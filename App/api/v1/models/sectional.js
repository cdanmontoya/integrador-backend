/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sectional', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'sectional',
    timestamps: false
  });
};
