const Quote = require('../models/Quotes')

class QuotesController {
    async getQuotes(req, res) {
        const quotes = await Quote.find()
        res.json(quotes)
    }

    async createQuote(req, res) {
        const {content, author} = req.body

        const newQuote = new Quote({
            content: content,
            author: author
        })

        const saveQuote = await newQuote.save()

        res.json(saveQuote)
    }

    async getSpecificQuote(req, res) {

        const quote = await Quote.findById({_id: req.params.id})

        res.json(quote)
    }

    async deleteQuote(req, res) {

        const result = await Quote.findByIdAndDelete({_id: req.params.id})

        res.json(result)
    }

    async updateQuote(req, res) {
        const quote = await Quote.updateOne({_id: req.params.id}, {$set: req.body})

        res.json(quote)
    }
}

module.exports = new QuotesController()