import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API, NewPostBody, ServerPost} from "../../api/api";
import {AppDispatchType, AppRootStateType, RequestStatus} from "../../reducer";
import {applicationActions} from "../../features/Application";
import {handleAsyncServerError} from "../../utils/handleAsyncServerError";

//AsyncThunks
export const fetchPostsTC = createAsyncThunk<
    { posts: Array<ServerPost> }, //Return type from createAsyncThunk
    undefined,                    //What arguments take createAsyncThunk feature
    {
        dispatch: AppDispatchType,
        state: AppRootStateType,
        rejectValue: ValidationErrors
    }>
('Posts/fetchPosts', async (param, thunkAPI) => {

    thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
    //If use try catch statement mark need to setup catch return type
    try {
        const res = await API.getAllPosts()
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'success'}))
        return {posts: res}
    } catch (error) {
        return handleAsyncServerError(error.response.data, thunkAPI)
    }
})

export const createPostTC = createAsyncThunk<
    ServerPost,
    NewPostBody,
    {
        dispatch: AppDispatchType,
        state: AppRootStateType,
        rejectValue: ValidationErrors
    }>
('Posts/createPost', async (newPostBody, thunkAPI) => {
    thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
    //If use try catch statement mark need to setup catch return type
    try {
        const res = await API.createPost(newPostBody)
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'success'}))
        return res
    } catch (error) {
        return handleAsyncServerError(error.response.data, thunkAPI)
    }
})

export const deletePostTC = createAsyncThunk<
    { postId: string | bigint },
    { postId: string },
    { dispatch: AppDispatchType, state: AppRootStateType, rejectValue: ValidationErrors }>
('Posts/deletePost', async (param, thunkAPI) => {
    thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
    //If use try catch statement mark make sure that typed catch return type
    try {
        const res = await API.deletePost(param.postId)
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'success'}))
        return {postId: res._id}
    } catch (error) {
        return handleAsyncServerError(error.response.data, thunkAPI)
    }
})

export const updatePostTC = createAsyncThunk<
    ServerPost,
    {
        postId: string
        updatePostBody: NewPostBody
    },
    {
        dispatch: AppDispatchType,
        state: AppRootStateType,
        rejectValue: ValidationErrors
    }>
('Posts/updatePost', async (params, thunkAPI) => {
    thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
    //If use try catch statement mark need to setup catch return type
    try {
        const res = await API.updatePost(params.postId, params.updatePostBody)
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'success'}))
        return res
    } catch (error) {
        return handleAsyncServerError(error.response.data, thunkAPI)
    }
})

export const asyncActions = {
    fetchPostsTC,
    createPostTC,
    deletePostTC,
    updatePostTC
}

const initialState: PostsState = {
    posts: [],
    errors: ''
}

export const slice = createSlice({
    name: 'Posts',
    initialState: initialState,
    reducers: {
        changePostRegStatus(state, action: PayloadAction<{ _id: string, status: RequestStatus }>) {
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
                const {postTitle, body, userName, createdAt, _id} = action.payload
                const newPost: Post = {
                    _id: _id,
                    body: body,
                    postTitle: postTitle,
                    userName: userName,
                    createdAt: createdAt,
                    __v: 0,
                    reqStatus: "idle"
                }
                state.posts = [...state.posts, newPost]
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
            .addCase(asyncActions.updatePostTC.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post._id === action.payload._id)
                state.posts[index] = {
                    ...state.posts[index],
                    postTitle: action.payload.postTitle,
                    body: action.payload.body
                }
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

export interface Post extends ServerPost {
    reqStatus: RequestStatus
}

