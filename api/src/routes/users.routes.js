const express = require("express");
const { body, validationResult } = require("express-validator");

const usersController = require("../controllers/users.controllers");
const path = require("path");
const { userExist, userUpdate } = require("../middlewares/UserExistMiddleware");
const { validateToken } = require("../middlewares/validateToken");

const getUsers = usersController.getUsers;
const createUsers = usersController.createUsers;
const getUserById = usersController.getUserById;
const deleteUserById = usersController.deleteUserById;
const updateUserById = usersController.updateUserById;
const login = usersController.login;
const logout = usersController.logout;

const router = express.Router();

// Definición de rutas y aplicando middlewares

// Ruta para obtener todos los usuarios (protegida por el middleware validateToken)
router.get("/users", [validateToken], getUsers);
router.post("/login", login);

// Ruta para cerrar sesión de usuario y redirigir a la página de inicio de sesión
router.post("/logout", logout, (req, res) => {
  // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
  res.redirect("/login");
});
router.post(
  "/users",
  [
    // Validación de campos del formulario usando express-validator
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
    userExist, // Middleware userExist para verificar si el usuario ya existe
  ],
  createUsers
);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUserById);
router.put(
  "/users/:id",
  [
    // Validación de campos del formulario usando express-validator
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
    userUpdate, // Middleware userUpdate para verificar si el nombre de usuario ha cambiado
  ],
  updateUserById
);

module.exports = router;
