/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('block', {
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    sectionalID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sectional',
        key: 'id',
      },
    },
  }, {
    tableName: 'Block',
    timestamps: false,
  });
};
