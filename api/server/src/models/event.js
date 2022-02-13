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
      validate: {
        notEmpty: true,
        notTooLong(value) {
          if (value.length > 60) throw new Error();
        },
      },
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      }
    },
    description: {
      type: DataTypes.STRING(300),
      validate: {
        notTooLong(value) {
          if (value.length > 300) throw new Error();
        },
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    state: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ["date"]),
      get() {
        let state;
        const today = new Date();
        const inTenDays = new Date();
        const tenDaysAgo = new Date();
        inTenDays.setDate(inTenDays.getDate() + 10);
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        if (this.get("date") > inTenDays) state = "farFuture";
        if (this.get("date") < inTenDays && this.get("date") > today) state = "closeFuture";
        if (this.get("date") < today && this.get("date") > tenDaysAgo) state = "closePast";
        if (this.get("date") < tenDaysAgo) state = "farPast";

        return state;
      },
      set() {
        throw new Error("Do not try to set the `state` value!");
      },
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
