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
    },
    message: DataTypes.STRING(140),
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
