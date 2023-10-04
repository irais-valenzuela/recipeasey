const Sequelize = require( "sequelize")
const db = require("../db")

const UserRecipes = db.define("userRecipe", {
  userId: { type: Sequelize.INTEGER },
  recipeName: { type: Sequelize.STRING },
  recipeId: { type: Sequelize.INTEGER },
  type: { type: Sequelize.STRING },
  sortNum: { type: Sequelize.INTEGER },
});

module.exports = UserRecipes;
