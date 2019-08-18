/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('items_per_request', {
    requestID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'request',
        key: 'id',
      },
    },
    itemType: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item_type',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
  }, {
    tableName: 'items_per_request',
    timestamps: false,
  });
};
