/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('turn_state', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'Turn_state',
    timestamps: false,
  });
};
