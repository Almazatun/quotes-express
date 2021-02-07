import SECRET_KEY from "../config"
import jwt from 'jsonwebtoken'
import {IUser} from "../models/Users";


const generateToken = (user: IUser) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            userName: user.userName
        }
        , SECRET_KEY, {expiresIn: '1h'})
}

export default generateToken

