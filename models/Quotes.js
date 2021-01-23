const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuotesSchema = new Schema({
    content: String,
    author: String
})

module.exports = mongoose.model('Quote', QuotesSchema)