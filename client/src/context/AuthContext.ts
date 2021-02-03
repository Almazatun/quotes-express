import {createContext} from "react";
import jwtDecode, {JwtPayload} from "jwt-decode";
import {AuthState, User} from "./reducer";

export let AuthContextState: AuthState = {
    user: {},
    isAuth: false
}

export enum TOKEN {
    IS_TOKEN = 'jwtToken'
}


//This is condition allow to save the user data
if (localStorage.getItem(TOKEN.IS_TOKEN)) {

    const decodedToken = jwtDecode<JWT>(localStorage.getItem(TOKEN.IS_TOKEN) as string);

    if (decodedToken.exp! * 1000 < Date.now()) {
        localStorage.removeItem(TOKEN.IS_TOKEN)
    } else  {
        const {id ,userName, email} = decodedToken
        const LocalStorageData: User = {
            _id: id,
            userName: userName,
            email: email,
            token: localStorage.getItem(TOKEN.IS_TOKEN) as string
        }
        AuthContextState.user = LocalStorageData
        AuthContextState.isAuth = true
    }
}

export const AuthContext = createContext({
    user: AuthContextState.user,
    isAuth: AuthContextState.isAuth,
    signOut: () => {},
})

//Constructs a type by picking the set of properties Keys from Type.
export type UserData = Pick<User, "userName" | "email"> & {id: string};

//Put on the user data type with JWTPayload type
export type JWT = JwtPayload & UserData
