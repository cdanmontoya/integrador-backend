/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('turn', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    stateTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    auxiliarID: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'user',
        key: 'username'
      }
    }
  }, {
    tableName: 'turn'
  });
};
