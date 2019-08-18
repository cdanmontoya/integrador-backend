/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'user_type',
    timestamps: false,
  });
};
