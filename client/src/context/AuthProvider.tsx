import React, {useReducer} from "react";
import {authActions, authReducer} from "./index";
import {initialState, User} from "./reducer";
import {AuthContext, TOKEN} from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
    const [state, dispatch] = useReducer(authReducer, initialState)


    function signOutUser() {

        //Remove token from localStorage if user logOut
        localStorage.removeItem(TOKEN.IS_TOKEN)

        const userEmpty: User = {
            _id: '',
            userName: '',
            email: '',
        }
        dispatch(authActions.signOut(userEmpty))
    }

    return (
        <AuthContext.Provider value={{user: state.user, isAuth: state.isAuth, signOut: signOutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}