/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('rooms_per_logistic_unit', {
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
    sectionalID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'room',
        key: 'sectionalID',
      },
    },
    blockID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'room',
        key: 'blockID',
      },
    },
    roomID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'room',
        key: 'id',
      },
    },
  }, {
    tableName: 'Rooms_per_Logistic_Unit',
    timestamps: false,
  });
};
