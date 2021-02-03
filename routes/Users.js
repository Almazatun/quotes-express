const express = require('express')
const router = express.Router()
const UsersController = require('../controller/Users')

//Middlewares
const registerInput = require('../helpers/user/registerInput')
const signInInput = require('../helpers/user/signInInput')

//Environment variables
const signUpNewUserUrl = process.env.SIGN_UP_NEW_USER_URL || '/signUp'
const getUsersUrl = process.env.GET_USERS_URL || '/'
const deleteUserUrl = process.env.DELETE_USER_URL || 'delete'


router.post(signUpNewUserUrl, registerInput, UsersController.createUser)
router.get(getUsersUrl, UsersController.getUsers)
router.delete(`/${deleteUserUrl}/:id`, UsersController.deleteUser)
router.post(`/signIn`,signInInput,  UsersController.SignIn)

module.exports = router