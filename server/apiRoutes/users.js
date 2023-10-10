const userRouter = require("express").Router();
const {
  User,
  UserRecipes,
  UserCalendarRecipes,
} = require("../database/index");

const {
  determineRecipeSortNum,
  determineMealType,
  findDuplicateRecipes,
  addIncomingRecipesToCalendar,
} = require("../helperFunctions");

// userRouter.get("/", async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     res.send(users);
//   } catch (err) {
//     next(err);
//   }
// });

userRouter.get("/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.byToken(token);
    const { username } = await User.findOne({
      where: {
        id: user.id,
      },
    });
    res.send(username);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/userRecipes/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.byToken(token);
    const recipes = await UserRecipes.findAll({ where: { userId: user.id } });
    if (recipes.length === 0) res.send("No Recipes").status(200);
    else res.send(recipes).status(200);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/userRecipes/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const { title, id, dishTypes } = req.body;
    const sortNum = determineRecipeSortNum(dishTypes);
    const user = await User.byToken(token);
    
    console.log('USER', user)
    console.log('USER.ID', user.id)

    console.log("ID", id)
    console.log("Body", req.body)
    
    // saying if in the UserRecipes it exists than say already saved need to use userId
    const existingRecipe = !!(await UserRecipes.findOne({
      where: { recipeId: id, userId: user.id },
    }));

    console.log('EXISTING RECIPE FOR USER', existingRecipe)

    if (existingRecipe === false) {
      const recipe = await UserRecipes.create({
        userId: user.id,
        recipeName: title,
        recipeId: id,
        type: determineMealType(sortNum),
        sortNum,
      });
   
      res.send(recipe).status(200);
    }

    res.send("Already saved").status(200);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/addRecipesToCalendar/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } =
      req.body;
    const user = await User.byToken(token);
    let userCalendar;

    const userCalendarObject = await UserCalendarRecipes.findOne({
      where: {
        userId: user.id,
      },
    });

    if (userCalendarObject) {
      let nonDuplicatedRecipesObject = findDuplicateRecipes(
        req.body,
        userCalendarObject
      );
      addIncomingRecipesToCalendar(
        userCalendarObject,
        nonDuplicatedRecipesObject
      );

      await userCalendarObject.save();
      userCalendar = userCalendarObject;
    } else {
      userCalendar = await UserCalendarRecipes.create({
        userId: user.id,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday,
      });
    }

    res.send(userCalendar).status(200);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/addRecipesToCalendar/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.byToken(token);

    const userCalendar = await UserCalendarRecipes.findOne({
      where: { userId: user.id },
    });

    res.send(userCalendar).status(200);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/deleteRecipe/:token/:recipeId", async (req, res, next) => {
  try {
    const { token, recipeId } = req.params;
    const user = await User.byToken(token);

    const recipeToDelete = await UserRecipes.findOne({
      where: { userId: user.id, recipeId: recipeId },
    });

    await recipeToDelete.destroy();

    const userRecipes = await UserRecipes.findAll({
      where: { userId: user.id },
    });

    res.send(userRecipes).status(200);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/deleteUserCalendar/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.byToken(token);

    const calendarInstance = await UserCalendarRecipes.findOne({
      where: { userId: user.id },
    });

    if (calendarInstance) {
      await calendarInstance.destroy();
      const deletedCalendar = await UserCalendarRecipes.findAll({
        where: { userId: user.id },
      });

      res.send(deletedCalendar).status(200);
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
