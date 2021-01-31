const Post = require('../models/Posts')

class PostsController {
    async getPosts(req, res) {
        const quotes = await Post.find()
        res.json(quotes)
    }

    async createPost(req, res) {

        const middlewareUserData = req.userData.data //Data from VerifyToken middleware
        const {body} = req.body

        console.log('MIDDLEWARE_USER_DATA', middlewareUserData)

        const newQuote = new Post({
            body: body,
            userName: middlewareUserData.userName,
            createdAt: new Date().toISOString(),
            user: middlewareUserData.id
        })

        const saveQuote = await newQuote.save()

        res.json(saveQuote)
    }

    async getSpecificPost(req, res) {

        const quote = await Post.findById({_id: req.params.id})

        res.json(quote)
    }

    async deletePost(req, res) {
        const middlewareUserData = req.userData.data //Data from VerifyToken middleware

        // * Improved delete method
        //Instead of immediately delete.
        //const quote = await Quote.findByIdAndDelete({_id: req.params.id})

        try {
            //Before delete each of the quote the case to check and allow delete action,
            //only if the user want to delete own post not to another
            const {userName} = await Post.findById({_id: req.params.id})

            console.log("USER_NAME", userName)

            // Each of the user can delete only own post
            if (middlewareUserData.userName === userName) {
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

    async updatePost(req, res) {
        const middlewareUserData = req.userData.data //Data from VerifyToken middleware

        const {userName} = await Post.findById({_id: req.params.id})

        try {
            // Each of the user can update only own post
            if (middlewareUserData.userName === userName) {
                const quote = await Post.updateOne({_id: req.params.id}, {$set: req.body})
                res.json(quote)
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
}

module.exports = new PostsController()