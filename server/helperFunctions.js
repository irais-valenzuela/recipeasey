// This file contains functions I need in other files but don't want other files to be overwhelming with helper functions.

// using in server/api/users.js
const determineRecipeSortNum = (dishtypesArr) => {
    let sortNum = 0;
  
    for (let i = 0; i < dishtypesArr.length; i++) {
      let dishtype = dishtypesArr[i];
      if (
        dishtype === "breakfast" ||
        dishtype === "brunch" ||
        dishtype === "morning meal"
      )
        sortNum = 1;
      else if (
        dishtype === "appetizer" ||
        dishtype === "lunch" ||
        dishtype === "snack"
      )
        sortNum = 2;
      else if (
        dishtype === "dinner" ||
        dishtype === "lunch" ||
        dishtype === "main dish" ||
        dishtype === "main course"
      )
        sortNum = 3;
  
      if (sortNum > 0) break;
    }
  
    if (sortNum === 0) sortNum = 4;
  
    return sortNum;
  };
  
  // using in server/api/users.js
  const determineMealType = (sortNum) => {
    if (sortNum === 1) return "breakfast";
    else if (sortNum === 2) return "lunch";
    else if (sortNum === 3) return "dinner";
    else return "other";
  };
  
  // using in server/api/recipes.js
  const removeMins = (mealTime) => {
    let result = [];
    for (let i = 0; i < mealTime.length; i++) {
      let curElem = mealTime[i];
      if (!isNaN(parseInt(curElem))) {
        result.push(curElem);
      }
    }
    return result.join("");
  };
  
  // using in server/api/users.js
  const findDuplicateRecipes = (requestBody, dbUserRecipes) => {
    const result = {};
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
  
    days.forEach((day) => {
      const dayArray = requestBody[day] || [];
      result[day] = dayArray.filter((recipeObj) => {
        const dbDayArray = dbUserRecipes[day] || [];
        return !dbDayArray.some((dbRecipeObj) => dbRecipeObj.recipeId === recipeObj.recipeId);
      });
    });
  
    return result;
  };
  
  
  const addIncomingRecipesToCalendar = (
    userCalendarObject,
    nonDuplicatedRecipesObject
  ) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
  
    days.forEach((day) => {
      userCalendarObject[day] = userCalendarObject[day]
        ? [...userCalendarObject[day], ...nonDuplicatedRecipesObject[day]]
        : [];
    });
  };
  
  module.exports = {
    determineRecipeSortNum,
    determineMealType,
    removeMins,
    findDuplicateRecipes,
    addIncomingRecipesToCalendar,
  };
  