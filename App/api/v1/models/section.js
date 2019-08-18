/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('section', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    logisticUnit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'user',
        key: 'username',
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'Section',
    timestamps: false,
  });
};
