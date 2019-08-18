/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('rooms_per_turn', {
    turnID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'turn',
        key: 'id',
      },
    },
    sectionalID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'room',
        key: 'sectionalID',
      },
    },
    blockID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'room',
        key: 'blockID',
      },
    },
    roomID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'room',
        key: 'id',
      },
    },
  }, {
    tableName: 'rooms_per_turn',
    timestamps: false,
  });
};
