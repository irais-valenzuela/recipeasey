const express = require("express");
const app = express();
const path = require("path");
const router = require("./apiRoutes")
const cors = require("cors")

const allowedOrigin = 'http://localhost:3000'; 

app.use(cors({
  origin: allowedOrigin, // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 204, // Set to 204 for preflight (OPTIONS) requests
}));

app.use(express.json());

app.use('/api', router)

// app.use(express.urlencoded({ extended: true }));

// uncomment when pushing
// app.use(express.static(path.join(__dirname, "../build")));

// app.get("", function (req, res) {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

// when working locally use this
// app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.send('making it to backend api')
})

// app.use("/api", router);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// handles 500 errors
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
