import {NextFunction, Request, Response} from "express";
import validators from "../../utils/validators";

//Sign In middleware
const signInInput = (req: Request, res: Response, next: NextFunction) => {
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

export default signInInput