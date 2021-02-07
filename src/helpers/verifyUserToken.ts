import authUser from '../utils/authUser'
import {Request, Response, NextFunction} from "express";

const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {

    const {errors, userData} = authUser(req)

    console.log('VERIFY', errors)
    console.log('userData', userData)

    /* Unless counts of errors greater then 1 or equal to one => */
    /* => will be send error message of the */
    if (Object.keys(errors!).length >= 1) {
        console.log('ERRORS')
        res.status(400).json({
            errors: errors,
            message: '👉 Bad request'
        })
    } else {
        console.log('SUCCESS')
        //Create custom data the userData and pass this data to next middleware the Posts
        req.currentUser = userData
        next()
    }
}

export default verifyUserToken