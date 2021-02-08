import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatus} from "../../reducer";

const initialState: ApplicationState = {
    status: 'idle',
    errors: ''
}

export const slice = createSlice({
    name: 'application',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatus }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ errors: ErrorType }>) {
            state.errors = action.payload.errors
        },
    }
})

//Types
export interface ApplicationState {
    status: RequestStatus,
    errors: ErrorType,
}


export type ErrorType = string | Array<string> | Array<{[key: string]: string | Array<string> }>




