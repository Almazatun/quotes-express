import {Request} from "express";
import jwt from 'jsonwebtoken'
import SECRET_KEY from "../config";

//Types
interface IAuthErrors {
    AuthenticationError?: string
    AuthorizationToken?: string
    AuthorizationHeader?:string
}

//The reason extended from object because jwt.verify(token, SECRET_KEY) function might be return object
export interface IsUser extends Object {
    id?: string
    userName?: string,
    email?: string,
    iat?: number,
    exp?: number

}

const authUser = (context:Request): {errors: IAuthErrors | null, userData: IsUser } => {
    const errors: IAuthErrors = {}
    let isUser: IsUser = {}
    const authHeader = context.headers["authorization"];
    const secretKey = process.env.SECRET_KEY || SECRET_KEY

    if (authHeader) {
        const token =  authHeader.split("Bearer ")[1]
        if (token) {
            try {
                isUser = jwt.verify(token, secretKey)
            } catch (error) {
                errors.AuthenticationError = 'Invalid / Expired token' //token inactivity
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


export default authUser