const db = require("./db")
const User = require("./Models/users");
const UserRecipes = require("./Models/userRecipes");
const UserCalendarRecipes = require("./Models/userCalendarRecipes");

User.hasMany(UserRecipes);
User.hasOne(UserCalendarRecipes, {
  foreignKey: "userId",
});

module.exports = { db, User, UserRecipes, UserCalendarRecipes };
