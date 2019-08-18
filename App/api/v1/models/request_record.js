/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('request_record', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    requestID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'request',
        key: 'id',
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    observation: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    uptatedBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'user',
        key: 'username',
      },
    },
    stateID: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'request_record',
    timestamps: false,
  });
};
