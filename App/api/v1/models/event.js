/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('event', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    eventType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'event_type',
        key: 'id',
      },
    },
    sectionalID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'sectionalID',
      },
    },
    blockID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'blockID',
      },
    },
    roomID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'id',
      },
    },
    stateID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'event_state',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    userID: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'user',
        key: 'username',
      },
    },
  }, {
    tableName: 'event',
    timestamps: false,
  });
};
