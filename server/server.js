const express = require("express");
const app = express();
const path = require("path");
const router = require("./apiRoutes")
const cors = require("cors")


// uncomment in development
const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://recipeasey-diry.onrender.com'
  : 'http://localhost:3000'; 


app.use(cors({
  origin: allowedOrigin, // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
  optionsSuccessStatus: 204, // Set to 204 for preflight (OPTIONS) requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)


// uncomment when pushing
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


// handles 500 errors
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
