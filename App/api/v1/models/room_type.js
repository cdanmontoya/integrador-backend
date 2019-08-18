/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('room_type', {
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
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'room_type',
    timestamps: false,
  });
};
