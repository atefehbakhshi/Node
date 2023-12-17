const express = require("express");
// validate inputs data
const { body, validationResult } = require("express-validator");

const users = require("./users");
const app = express();

//parse body in req.body in post method
app.use(express.json());

//send all users
app.get("/api/users", (req, res) => {
  res.json({
    data: users,
    message: "ok",
  });
});

//send user by id
app.get("/api/users/:id", (req, res) => {
  const userId = +req.params.id;
  console.log(userId);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({
      data: null,
      message: "User not found!!!",
    });
  } else {
    res.json({
      data: user,
      message: "ok",
    });
  }
});

//create new user
app.post(
  "/api/users",
  [
    // validation for inputs data
    body("email", "Email must be valid").isEmail(),
    body("first_name", "First name can't be empty").notEmpty(),
    body("last_name", "Last name can't be empty").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "Validation error",
      });
    }
    users.push({ id: users.length + 1, ...req.body });
    res.json({
      data: users,
      message: "ok",
    });
  }
);

//edit user
app.put(
  "/api/users/:id",
  [
    // validation for inputs data
    body("email", "Email must be valid").isEmail(),
    body("first_name", "First name can't be empty").notEmpty(),
    body("last_name", "Last name can't be empty").notEmpty(),
  ],
  (req, res) => {
    const userId = +req.params.id;
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({
        data: null,
        message: "User not found!!!",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "Validation error",
      });
    }

    const userIndex = users.findIndex((user) => user.id === userId);
    users[userIndex] = { id: userId, ...req.body };
    // users.push({ id: users.length + 1, ...req.body });
    res.json({
      data: users,
      message: "ok",
    });
  }
);

//delete user
app.delete("/api/users/:id", (req, res) => {
  const userId = +req.params.id;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({
      data: null,
      message: "User not found!!!",
    });
  }
  const userIndex = users.findIndex((user) => user.id === userId);
  users.splice(userIndex, 1);
  res.json({
    data: users,
    message: "ok",
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));
