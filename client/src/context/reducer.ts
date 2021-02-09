import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_AUTH, LogInArguments} from "../api/api";
import {AppDispatchType, AppRootStateType} from "../reducer";
import {ValidationErrors} from "../components/Posts/reducer";
import {AuthContextState, TOKEN} from "./AuthContext";
import {handleAsyncServerError} from "../utils/handleAsyncServerError";
import {applicationActions} from "../features/Application";


export const initialState: AuthState  = AuthContextState

//AsyncThunks
export const signInTC = createAsyncThunk<
    { user: User }, //Return type from the LogInTC
    LogInArguments,  //What arguments take the LogInTC
    {
        dispatch: AppDispatchType,
        state: AppRootStateType ,
        rejectValue: ValidationErrors
    }
    >
('Authentication/signInTC', async (param, thunkAPI) => {

    thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
    //If use try catch statement mark make sure that typed catch return type
    try {
        const res = await API_AUTH.logIn(param)
        //Saving token of the user in the Localstorage
        localStorage.setItem(TOKEN.IS_TOKEN, res.token)

        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'success'}))
        return { user: res }
    } catch (error) {
        return  handleAsyncServerError(error.response.data, thunkAPI)
    }
})

export const asyncActions = {
    signInTC,
}

export const slice = createSlice({
    name: 'Authentication',
    initialState: initialState,
    reducers: {
        signOut: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuth = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(asyncActions.signInTC.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.isAuth = true
                })
            }
})


//Types
export interface AuthState {
    user: User | object
    isAuth: boolean
}

export interface User {
    _id: string,
    userName: string,
    email: string,
    token?: string
}