/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    requestType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'request_type',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    stateID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'request_state',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attendedBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    sectionalID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'sectionalID'
      }
    },
    blockID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'blockID'
      }
    },
    roomID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'room',
        key: 'id'
      }
    },
    eventID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'event',
        key: 'id'
      }
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'request'
  });
};
