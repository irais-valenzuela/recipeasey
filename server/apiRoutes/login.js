const loginRouter = require("express").Router();
const { User } = require("../database/index");

loginRouter.post("/auth", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    console.log('error')
    next(err);
  }
});

loginRouter.get("/auth", async (req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization))
  } catch (err) {
    next(err);
  }
});

// signing up user
loginRouter.post("/auth/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({
      username,
      password,
    });
    console.log('created user!')
    res.send({ token: await user.generateToken() });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
