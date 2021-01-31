const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')
const PostsController = require('../controller/Posts')
const verifyUserToken = require('../helpers/verifyUserToken')

//Get all routes
router.get('/' , PostsController.getPosts)

//Create new quote
router.post('/new', verifyUserToken,  PostsController.createPost)

//Get specific quote
router.get('/get/:id',  PostsController.getSpecificPost)

//Delete a quote
router.delete('/delete/:id', verifyUserToken,  PostsController.deletePost)

//Update a quote
router.patch('/update/:id', verifyUserToken,  PostsController.deletePost)

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

module.exports = router