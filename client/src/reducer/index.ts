import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import {postsReducer} from "../components/Posts";
import {authReducer} from "../context";
import {applicationReducer} from "../features/Application";


export const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
    application: applicationReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

//Types
export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export type ThunkAPIType = {
    dispatch: (action: unknown) => unknown
    rejectWithValue: Function
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'failed'