import {instance} from "../confirm/apiData";


//API
export const API = {
    getAllPosts() {
        return instance.get<Array<PostServe>>('posts/').then(res => {
            return res.data
        })
    },
    createPost(postBody: string) {
        return instance.post<PostServe>('posts/new/', postBody).then(res => res.data)
    },
    deletePost(postId: string) {
        return instance.delete<PostServe>(`posts/delete/${postId}`).then(res => res.data)
    },
    updatePost(postId: string, title: string,) {
        const data: { content: string } = {content: title}
        return instance.patch<PostServe>(`posts/update/${postId}`, data)
    }
}

//Auth API
export const API_AUTH = {
    logIn(data: LogInArguments){
        return instance.post<IUserServe>(`users/signIn/`, data).then(res => {
            return res.data
        })
    }
}

//Types
export interface PostServe {
    _id: string
    body: string,
    userName: string,
    createdAt: string,
    user: string,
    __v?: number
}

export interface LogInArguments {
    userName: string,
    password: string
}

export interface IUserServe {
    _id: string
    userName: string
    email: string
    password: string
    createdAt: string
    __v: number,
    token: string
}