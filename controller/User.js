const User = require('../models/Users')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateTokken')

class UserController {
    async createUser(req, res) {
        const {userName, email, password} = req.body
        try {
            // Make sure the user does not already exist in database storage
            const user = await User.findOne({userName}).exec() //Promise
            const userEmail = await User.findOne({email}).exec()

            if (user) {
                res.status(400).json({
                    errors: {
                        userName: 'This is userName already exist 🔒',
                        message: 'Try to use other userName'
                    }
                })
            } else if (userEmail) {
                res.status(400).json({
                    errors: {
                        userEmail: 'This is email already exist 🔒',
                        message: 'Try to use other email'
                    }
                })
            } else {
                //Create a new user

                //Hashing password
                const bcryptPassword = await bcrypt.hash(password, 12)

                const newUser = new User({
                    userName: userName,
                    email: email,
                    password: bcryptPassword,
                    createdAt: new Date().toISOString()
                })

                const saveUser = await newUser.save()

                res.json({
                    message: 'User created successfully 👍',
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Some error ❌",
                errors: {...error},
            })
        }
    }

    async getUsers(req, res) {
        const users = await User.find()
        res.json(users)
    }

    async SignIn(req, res) {
        const {userName, password} = req.body

        //Make sure the user existed in the database
        const user = await User.findOne({userName})

        try {
            if (!user) {
                res.status(404).json({
                    errors: {
                        message: 'User not found 👥',
                    }
                })
            } else {
                //Make sure the user typed correct password
                const match = await bcrypt.compare(password, user.password)

                //Unless the user password incorrect the user get error message
                if (!match) {
                    res.status(401).json({
                        errors: {
                            error: 'Wrong credentials 🆘',
                            message: 'Please check your user name or password and try again',
                        }
                    })
                } else {
                    const token = generateToken(user)
                    res.json({
                        ...user._doc,
                        token
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: "Some error ❌",
                errors: {...error},
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete({_id: req.params.id})
            if (user) {
                res.json({
                    message: "User successfully deleted ✔"
                })
            } else {
                res.json({
                    message: "Sorry, User does not exist 👽"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Some error ❌",
                errors: {...error},
            })
        }
    }
}

module.exports = new UserController()
