const axios = require("axios");
const dotenv = require("dotenv");
const { Router } = require("express");
const { removeMins } = require("../helperFunctions");
dotenv.config();
const recipesRouter = Router();
const apiKey = process.env.API_KEY;

// get recipes based on cuisineType, mealType, mealTime
recipesRouter.post("/", async (req, res, next) => {
  try {
    let { cuisineType, mealType, mealTime } = req.body;

    if (mealTime === "all") {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisineType}&type=${mealType}`
      );
      res.send(data.results);
    } else {
      mealTime = removeMins(mealTime);
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisineType}&maxReadyTime=${mealTime}&type=${mealType}`
      );
      res.send(data.results);
    }
  } catch (error) {
    next(error);
  }
});

// get specific recipe by id
recipesRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    );
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// Similar recipes
recipesRouter.get("/similarRecipes/:recipeId", async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${apiKey}&number=2`
    );
    res.send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = recipesRouter;
