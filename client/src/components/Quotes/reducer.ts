import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, QuoteServe} from "../../api/api";
import {AppDispatchType, AppRootStateType, RequestStatus} from "../../reducer";

//AsyncThunks
export const fetchQuotesTC = createAsyncThunk<
    { quotes: Array<QuoteServe> },
    undefined,
    {
        dispatch: AppDispatchType,
        state: AppRootStateType ,
        rejectValue: ValidationErrors
    }
    >
('Quotes/fetchQuotes', async (param, thunkAPI) => {
    //If use try catch statement mark need to setup catch return type
    try {
        const res = await API.getAllQuotes()
        return {quotes: res}
    } catch (error) {
        return thunkAPI.rejectWithValue({errorMessage: error.message})
    }
})

export const createQuoteTC = createAsyncThunk<
    QuoteServe,
    QuoteServe,
    {
        dispatch: AppDispatchType,
        state: AppRootStateType,
        rejectValue: ValidationErrors
    }
    >
('Quotes/createQuote', async (newQuoteData, thunkAPI) => {
    //If use try catch statement mark need to setup catch return type
    try{
        const res = await API.createQuote(newQuoteData)
        return res
    } catch (error){
        return thunkAPI.rejectWithValue({errorMessage: error.message})
    }

})

export const deleteQuoteTC = createAsyncThunk<
    { quoteId: string },
    { quoteId: string },
    { dispatch: AppDispatchType, state: AppRootStateType,  rejectValue: ValidationErrors}
    >
('Quotes/deleteQuote', async (param, thunkAPI) => {
    //If use try catch statement mark need to setup catch return type
    const res = await API.deleteQuote(param.quoteId)
    return {quoteId: res._id}
})

export const asyncActions = {
    fetchQuotesTC,
    createQuoteTC,
    deleteQuoteTC
}

const initialState: QuotesState = {
    quotes: [],
    errors: ''
}

export const slice = createSlice({
    name: 'Quotes',
    initialState: initialState,
    reducers: {
        changeQuoteRegStatus(state, action: PayloadAction<{_id: string, status: RequestStatus}>) {
            const index = state.quotes.findIndex(quote => quote._id === action.payload._id)
            state.quotes[index].reqStatus = action.payload.status
        }
    },
    extraReducers: builder => {
        builder
            .addCase(asyncActions.fetchQuotesTC.fulfilled, (state, action) => {
                state.quotes = action.payload.quotes.map(quote => {
                    return {...quote, reqStatus: 'idle'}
                })
            })
            .addCase(asyncActions.createQuoteTC.fulfilled, (state, action) => {
                const newQuote: Quote = {
                    _id: action.payload._id,
                    content: action.payload.content,
                    author: action.payload.author,
                    reqStatus: "idle"
                }
                state.quotes.unshift(newQuote)
            })
            .addCase(asyncActions.deleteQuoteTC.fulfilled, (state, action) => {
                const index = state.quotes.findIndex(quote => quote._id === action.payload.quoteId)
                if (index > -1) {
                    state.quotes.splice(index, 1)
                }
            })
            .addCase(asyncActions.fetchQuotesTC.rejected, (state, action) => {
                state.errors = action.payload?.errorMessage
            })
    }
})

export const {changeQuoteRegStatus} = slice.actions

//Types
export interface QuotesState {
    quotes: Array<Quote>,
    errors: string | null | undefined
}

interface ValidationErrors {
    errorMessage: string
    field_errors?: Record<string, string>
}

export interface Quote extends QuoteServe {
    reqStatus: RequestStatus
}

