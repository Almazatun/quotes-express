const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    createdAt: String
})

module.exports = mongoose.model("User", UserSchema)