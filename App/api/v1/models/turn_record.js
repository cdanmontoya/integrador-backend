/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('turn_record', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    turnID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'turn',
        key: 'id'
      }
    }
  }, {
    tableName: 'turn_record'
  });
};
