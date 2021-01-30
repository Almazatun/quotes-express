const validators = require('../../utils/validators')

//Sign In middleware
const signInInput = (req, res, next) => {
    const {userName, password} = req.body
    const {errors, valid} = validators.validationRulesSignIn(userName, password)

    if (!errors || !valid) {
        res.status(422).json({
            errors: errors,
            message: '👉 Please check it out your userName or password'
        })
    } else {
        return next()
    }
}

module.exports = signInInput