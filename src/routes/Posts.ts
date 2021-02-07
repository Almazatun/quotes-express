import express from 'express'
import Post from '../models/Posts'
import verifyUserToken from "../helpers/verifyUserToken";
import PostsController from "../controller/Posts";


const router = express.Router()

//Get all routes
router.get('/' , PostsController.getPosts)

//Create new quote
router.post('/new', verifyUserToken,  PostsController.createPost)

//Get specific quote
router.get('/get/:id',  PostsController.getSpecificPost)

//Delete a quote
router.delete('/delete/:id', verifyUserToken,  PostsController.deletePost)

//Update a quote
router.patch('/update/:id', verifyUserToken,  PostsController.updatePost)

//Get random quote
router.get('/random', async (req, res) => {
    const count = await Post.countDocuments()
    const random = Math.floor(Math.random() * count)
    const post = await Post.findOne().skip(random)

    res.json({
        count: count,
        post: post
    })
})

export default router