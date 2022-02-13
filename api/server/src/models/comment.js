'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Event, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init({
    author: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    message: {
      type: DataTypes.STRING(140),
      validate: {
        notEmpty: true,
        notTooLong(value) {
          if (value.length > 140) throw new Error();
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
