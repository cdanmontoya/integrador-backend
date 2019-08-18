/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('event_record', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    eventID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    stateID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'event_state',
        key: 'id',
      },
    },
  }, {
    tableName: 'event_record',
    timestamps: false,
  });
};
