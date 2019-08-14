/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    typeID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'item_type',
        key: 'id'
      }
    },
    statusID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'item',
    timestamps: false
  });
};
