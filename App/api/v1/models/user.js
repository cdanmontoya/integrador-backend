/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    logisticUnit: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    userType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_type',
        key: 'id'
      }
    }
  }, {
    tableName: 'user',
    timestamps: false
  },
  );
};
