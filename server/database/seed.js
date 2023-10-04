const db = require("./db");
const { User, UserRecipes, UserCalendarRecipes } = require("./index");

async function seed() {
  //creating users
  const user = await Promise.all([
    User.create({
      username: "Ira",
      email: "i@email.com",
      password: "123",
    }),
    User.create({
      username: "Yuri",
      email: "y@gmail.com",
      password: "1234",
    }),
    User.create({
      username: "Ashlyn",
      email: "a@gmail.com",
      password: "ABC",
    }),
    User.create({
      username: "Anah",
      email: "a@gmail.com",
      password: "ABCD",
    }),
    User.create({
      username: "Steve",
      email: "s@gmail.com",
      password: "ABCD",
    }),

  ]);

  const userRecipeObject = await Promise.all([
    UserCalendarRecipes.create({
      userId: 1,
      Monday: [
        {
          recipeId: 3,
          recipeName: "Tofu Taco",
          sortNum: 2,
          type: "Lunch",
          userId: 1,
        },
      ],
      Tuesday: [
        {
          recipeId: 12,
          recipeName: "Pitaya Bowl",
          sortNum: 1,
          type: "Breakfast",

          userId: 1,
        },
      ],
      Wednesday: [
        {
          recipeName: "Al pastor tacos",
          recipeId: 10,
          type: "Dinner",
          sortNum: 3,
          userId: 1,
        },
      ],
      Thursday: [
        {
          recipeName: "Al pastor tacos",
          recipeId: 10,
          type: "Dinner",
          sortNum: 3,
          userId: 1,
        },
      ],
      Friday: [
        {
          recipeName: "Carne Asada Burrito",
          recipeId: 13,
          type: "Dinner",
          sortNum: 3,
          userId: 1,
        },
      ],
    }),
  ]);

  const userRecipes = await Promise.all([
    UserRecipes.create({
      recipeName: "Tacos",
      recipeId: 1,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Apple Pie Smoothie",
      recipeId: 2,
      type: "Breakfast",
      sortNum: 1,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Tofu Taco",
      recipeId: 3,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Ramen Noodles",
      recipeId: 4,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Fish Tacos",
      recipeId: 5,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Turkey Wraps",
      recipeId: 6,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Poke Bowl",
      recipeId: 7,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Creamy Mushroom Chicken",
      recipeId: 8,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Chicken Kale Salad",
      recipeId: 9,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Al pastor tacos",
      recipeId: 10,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Ceviche",
      recipeId: 11,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Pitaya Bowl",
      recipeId: 12,
      type: "Breakfast",
      sortNum: 1,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Carne Asada Burrito",
      recipeId: 13,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[0].addUserRecipe(recipe)),
    // user 1
    UserRecipes.create({
      recipeName: "Tortas",
      recipeId: 14,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[1].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Pasta Alfredo",
      recipeId: 15,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[1].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Fish Tacos",
      recipeId: 5,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[1].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Turkey Sandwich",
      recipeId: 16,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[1].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Sushi",
      recipeId: 17,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[1].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Egg and Cheese Burrito",
      recipeId: 18,
      type: "Breakfast",
      sortNum: 1,
    }).then((recipe) => user[1].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Al pastor Burrito",
      recipeId: 19,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[1].addUserRecipe(recipe)),
    // user 2
    UserRecipes.create({
      recipeName: "Chickpea wrap",
      recipeId: 20,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[2].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Enchiladas",
      recipeId: 21,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[2].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Spagetti and Meatballs",
      recipeId: 29,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[2].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Turkey Wrap",
      recipeId: 6,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[2].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Al pastor tacos",
      recipeId: 10,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[2].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Banana Protein Smoothie",
      recipeId: 22,
      type: "Breakfast",
      sortNum: 1,
    }).then((recipe) => user[2].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Chicken Burrito",
      recipeId: 23,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[2].addUserRecipe(recipe)),
    // user 3
    UserRecipes.create({
      recipeName: "Apple Pie Smoothie",
      recipeId: 2,
      type: "Breakfast",
      sortNum: 1,
    }).then((recipe) => user[3].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Sweet Potato Fries",
      recipeId: 24,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[3].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Stuffed Bell Peppers",
      recipeId: 25,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[3].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Cauliflower Pizza",
      recipeId: 26,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[3].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Wet Burrito",
      recipeId: 27,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[3].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Ceviche",
      recipeId: 11,
      type: "Lunch",
      sortNum: 2,
    }).then((recipe) => user[3].addUserRecipe(recipe)),
    UserRecipes.create({
      recipeName: "Adobada Burrito",
      recipeId: 28,
      type: "Dinner",
      sortNum: 3,
    }).then((recipe) => user[3].addUserRecipe(recipe)),
  ]);

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = { seed, runSeed };