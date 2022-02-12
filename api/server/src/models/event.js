'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Comment, {
        as: "comments",
      });
    }
  }
  Event.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    description: DataTypes.STRING(300),
    email: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
