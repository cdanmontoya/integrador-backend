/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('section', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    logisticUnit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'user',
        key: 'username'
      }
    }
  }, {
    tableName: 'section'
  });
};
