const Sequelize = require("sequelize");
const db = require("../db")

const UserCalendarRecipes = db.define("userCalendarRecipe", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  Monday: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
  },
  Tuesday: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
  },
  Wednesday: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
  },
  Thursday: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
  },
  Friday: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
  },
  Saturday: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
  },
  Sunday: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
  },
});

module.exports = UserCalendarRecipes;
