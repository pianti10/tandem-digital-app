const express = require('express');

const usersController = require('../controllers/users.controllers');
const getUsers = usersController.getUsers;
const createUsers = usersController.createUsers;
const getUserById = usersController.getUserById;
const deleteUserById = usersController.deleteUserById;
const updateUserById = usersController.updateUserById;

const router = express.Router();


router.get('/users', getUsers)
router.post('/users', createUsers)
router.get('/users/:id', getUserById)
router.delete('/users/:id', deleteUserById);
router.put('/users/:id', updateUserById)

module.exports = router