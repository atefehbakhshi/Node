const express = require("express");
const router = express.Router();
// validate inputs data
const { body, validationResult } = require("express-validator");
const users = require("../users");

//send all users
router.get("/", (req, res) => {
  res.json({
    data: users,
    message: "ok",
  });
});

//send user by id
router.get("/:id", (req, res) => {
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
router.post(
  "",
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
router.put(
  "/:id",
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
