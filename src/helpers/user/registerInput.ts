import validators from "../../utils/validators"
import {NextFunction, Request, Response} from "express";


//Sign Up middleware
const registerInput = (req: Request, res: Response, next: NextFunction) => {
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

export default registerInput