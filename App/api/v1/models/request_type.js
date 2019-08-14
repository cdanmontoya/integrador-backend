/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'request_type',
    timestamps: false
  });
};
