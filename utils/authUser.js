const SECRET_KEY = require('../config')
const jwt = require('jsonwebtoken')

const authUser = (context) => {
    const errors = {}
    const isUser = {}
    const authHeader = context.headers["authorization"];

    if (authHeader) {
        const token =  authHeader.split("Bearer ")[1]
        if (token) {
            try {
                const user =  jwt.verify(token, SECRET_KEY)
                isUser.data = user

            } catch (error) {
                errors.AuthenticationError = 'Invalid/Expired token' //token inactivity
            }
        } else {
              errors.AuthorizationToken = 'Authentication token must be | 👉 Bearer [token]'
        }
    } else {
          errors.AuthorizationHeader = 'Authorization header must be provided'
    }

    return {
        errors: errors,
        userData: isUser
    }
}

module.exports = authUser