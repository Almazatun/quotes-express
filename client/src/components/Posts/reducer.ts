import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, PostServe} from "../../api/api";
import {AppDispatchType, AppRootStateType, RequestStatus} from "../../reducer";

//AsyncThunks
export const fetchPostsTC = createAsyncThunk<
    { posts: Array<PostServe> }, //Return type from createAsyncThunk
    undefined,                    //What arguments take createAsyncThunk feature
    {
        dispatch: AppDispatchType,
        state: AppRootStateType ,
        rejectValue: ValidationErrors
    }
    >
('Posts/fetchPosts', async (param, thunkAPI) => {
    //If use try catch statement mark need to setup catch return type
    try {
        const res = await API.getAllPosts()
        return {posts: res}
    } catch (error) {
        return thunkAPI.rejectWithValue({errorMessage: error.message})
    }
})

export const createPostTC = createAsyncThunk<
    PostServe,
    PostServe,
    {
        dispatch: AppDispatchType,
        state: AppRootStateType,
        rejectValue: ValidationErrors
    }
    >
('Posts/createPost', async (newPostData, thunkAPI) => {
    //If use try catch statement mark need to setup catch return type
    try{
        const res = await API.createPost(newPostData)
        return res
    } catch (error){
        return thunkAPI.rejectWithValue({errorMessage: error.message})
    }

})

export const deletePostTC = createAsyncThunk<
    { postId: string | bigint },
    { postId: string },
    { dispatch: AppDispatchType, state: AppRootStateType,  rejectValue: ValidationErrors}
    >
('Posts/deletePost', async (param, thunkAPI) => {

    //If use try catch statement mark make sure that typed catch return type
    try {
        const res = await API.deletePost(param.postId)
        return {postId: res._id}
    } catch (error) {
        return thunkAPI.rejectWithValue({errorMessage: error.message})
    }

})

export const asyncActions = {
    fetchPostsTC,
    createPostTC,
    deletePostTC
}

const initialState: PostsState = {
    posts: [],
    errors: ''
}

export const slice = createSlice({
    name: 'Posts',
    initialState: initialState,
    reducers: {
        changePostRegStatus(state, action: PayloadAction<{_id: string, status: RequestStatus}>) {
            const index = state.posts.findIndex(post => post._id === action.payload._id)
            state.posts[index].reqStatus = action.payload.status
        }
    },
    extraReducers: builder => {
        builder
            .addCase(asyncActions.fetchPostsTC.fulfilled, (state, action) => {
                state.posts = action.payload.posts.map(post => {
                    return {...post, reqStatus: 'idle'}
                })
            })
            .addCase(asyncActions.createPostTC.fulfilled, (state, action) => {
                const newPost: Post = {
                    _id: action.payload._id,
                    body: action.payload.body,
                    userName: action.payload.userName,
                    user: action.payload.user,
                    createdAt: action.payload.createdAt,
                    __v: action.payload.__v,
                    reqStatus: "idle"
                }
                state.posts.unshift(newPost)
            })
            .addCase(asyncActions.deletePostTC.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post._id === action.payload.postId)
                if (index > -1) {
                    state.posts.splice(index, 1)
                }
            })
            .addCase(asyncActions.fetchPostsTC.rejected, (state, action) => {
                state.errors = action.payload?.errorMessage
            })
    }
})

export const {changePostRegStatus} = slice.actions

//Types
export interface PostsState {
    posts: Array<Post>,
    errors: string | null | undefined
}

export interface ValidationErrors {
    errorMessage: string
    field_errors?: Record<string, string>
}

export interface Post extends PostServe {
    reqStatus: RequestStatus
}

