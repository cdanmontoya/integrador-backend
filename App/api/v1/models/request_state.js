/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('request_state', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'request_state',
    timestamps: false,
  });
};
