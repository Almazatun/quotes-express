import {Request, Response} from "express";
import Post from '../models/Posts'


//Posts Controller class
class PostsCTR {
    async getPosts(req: Request, res: Response) {
        const quotes = await Post.find()
        res.json(quotes)
    }

    async createPost(req: Request, res: Response) {

        const userData = req.currentUser //Data from VerifyToken middleware
        const {body, postTitle} = req.body


        const newPost = new Post({
            body: body,
            userName: userData.userName,
            postTitle: postTitle,
            createdAt: new Date().toISOString(),
            user: userData.id
        })

        const savePost = await newPost.save()

        res.json(savePost)
    }

    async getSpecificPost(req: Request, res: Response) {

        const quote = await Post.findById({_id: req.params.id})

        res.json(quote)
    }

    async deletePost(req: Request, res: Response) {
        const userData = req.currentUser //Data from VerifyToken middleware

        // * Improved delete method
        //Instead of immediately delete.
        //const quote = await Quote.findByIdAndDelete({_id: req.params.id})

        try {
            //Before delete each of the quote the case to check and allow delete action,
            //only if the user want to delete own post not to another
            const findPostData = await Post.findById({_id: req.params.id})

            console.log("USER_NAME", findPostData!.userName)

            // Each of the user can delete only own post
            if (userData.userName === findPostData!.userName) {
                const result = await Post.findByIdAndDelete({_id: req.params.id})
                res.json(result)
            } else {
                res.json ({
                    errors: {
                        AuthenticationError: 'Action not allowed 🔒'
                    },
                })
            }
        } catch (error) {
            res.json({
                errors: {...error}
            })
        }
    }

    async updatePost(req: Request, res: Response) {
        const middlewareUserData = req.currentUser //Data from VerifyToken middleware
        console.log("CONTROLLER_UPDATE")
        const findPostData = await Post.findById({_id: req.params.id})
        console.log("CONTROLLER_UPDATE")
        try {
            // Each of the user can update only own post
            if (middlewareUserData.userName === findPostData!.userName) {
                ///////////////////////////////////////////////////////////////////////////////////
                const post = await Post.updateOne({id: req.params.id}, {$set: req.body})
                console.log("POST", post)
                ///////////////////////////////////////////////////////////////////////////////////
                res.json(post)
            } else {
                res.json ({
                    errors: {
                        AuthenticationError: 'Action not allowed 🔒',
                        message: '👉 Bad request'
                    },
                })
            }
        } catch (error) {
            res.json({
                errors: Object.keys(error).length >= 1 ? error : 'Post with the ID not exist 🤬',
                message: '👉 Bad request'
            })
        }
    }
}
const PostsController = new PostsCTR
export default PostsController