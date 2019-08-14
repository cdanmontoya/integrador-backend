/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items_per_room', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itemID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    sectionalID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'room',
        key: 'sectionalID'
      }
    },
    blockID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'room',
        key: 'blockID'
      }
    },
    roomID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'room',
        key: 'id'
      }
    }
  }, {
    tableName: 'items_per_room'
  });
};
