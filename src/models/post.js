"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.author);
    }
  }
  Post.init(
    {
      title: DataTypes.TEXT,
      content: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
    },

    {
      sequelize,
      modelName: "post",
    }
  );
  return Post;
};
