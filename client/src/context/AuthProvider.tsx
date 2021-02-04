import React, {useReducer} from "react";
import {authReducer} from "./index";
import {initialState} from "./reducer";
import {AuthContext, TOKEN} from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
    const [state] = useReducer(authReducer, initialState)


    function signOutUser() {
        //Remove token from localStorage if user logOut
        localStorage.removeItem(TOKEN.IS_TOKEN)
    }

    return (
        <AuthContext.Provider value={{user: state.user, isAuth: state.isAuth, signOut: signOutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}