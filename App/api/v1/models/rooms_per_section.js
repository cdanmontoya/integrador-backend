/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('rooms_per_section', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sectionID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'section',
        key: 'id',
      },
    },
    roomID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'id',
      },
    },
    blockID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'blockID',
      },
    },
    sectionalID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'sectionalID',
      },
    },
  }, {
    tableName: 'Rooms_per_section',
    timestamps: false,
  });
};
