const {db} = require("./database/index");
const app = require("./server");
const PORT = 3005;

db.sync() // sync our database
  .then(function () {
    console.log("*Woohoo, Database synced, now starting our server!!*");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}!`);
    }); // then start listening with our express server once we have synced
  })
  .catch(function (error) {
    console.error("Error syncing the database:", error);
  });
