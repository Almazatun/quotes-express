const validators = require('../../utils/validators')

//Sign Up middleware
const registerInput = (req, res, next) => {
    const {userName ,email, password, confirmPassword} = req.body
    const {errors, valid} = validators.validationRules(userName, email, password, confirmPassword)

    if (!errors || !valid) {
        res.status(422).json({
            errors: errors,
            message: '👉 Please check it out your email or password'
        })
    } else {
        return next()
    }
}

module.exports = registerInput