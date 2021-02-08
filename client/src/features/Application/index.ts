import {slice as applicationSlice} from "./reducer";

export const applicationActions = {
    ...applicationSlice.actions
}

export const applicationReducer = applicationSlice.reducer
