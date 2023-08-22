const express = require("express");
const createUserMiddleware = require("../middlewares/createUser");
const { body, validationResult } = require("express-validator");

const usersController = require("../controllers/users.controllers");
const getUsers = usersController.getUsers;
const createUsers = usersController.createUsers;
const getUserById = usersController.getUserById;
const deleteUserById = usersController.deleteUserById;
const updateUserById = usersController.updateUserById;
const login = usersController.login;

const router = express.Router();

router.get("/users", getUsers);
router.post("/login", login);
router.post(
  "/users",
  [
    body("nombre").isString(),
    body("apellido").isString(),
    body("email").isEmail(),
    body("telefono").isMobilePhone("any"),
    body("usuario").isString(),
    body("contraseña").isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      return next();
    },
  ],
  createUsers
);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUserById);
router.put(
  "/users/:id",
  [
    body("nombre").isString().optional({ nullable: true }),
    body("apellido").isString().optional({ nullable: true }),
    body("email").isEmail().optional({ nullable: true }),
    body("telefono").isMobilePhone("any").optional({ nullable: true }),
    body("usuario").isString().optional({ nullable: true }),
    body("contraseña").isString().optional({ nullable: true }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      return next();
    },
  ],
  updateUserById
);

module.exports = router;
