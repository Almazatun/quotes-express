import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {quotesReducer} from "../components/Quotes";
import thunkMiddleware from 'redux-thunk'


export const rootReducer = combineReducers({
    quotes: quotesReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

//Types
export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch

export type RequestStatus = 'idle' | 'loading' | 'success' | 'failed'