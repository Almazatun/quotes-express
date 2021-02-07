import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import Posts from './routes/Posts'
import Users from './routes/Users'


//Create express app
const app = express()

//Config Object to Avoid Deprecation Warnings
const config = {useNewUrlParser: true, useUnifiedTopology: true}

//Set URI
const URI = process.env.MONGODB_URI || "mongodb://localhost/moon"

//Database
mongoose.connect(URI, config);

//Store Connection Object
const db = mongoose.connection;

//CONNECTION EVENTS
db.once('open', () => {
    console.log("Connected to MongoDB database...")
}).on("error", (err: string) => {
    console.log(err);
})

//Middleware
app.use(bodyParser.json())
app.use(cors())

//Routes || Middleware
app.use('/posts', Posts)
app.use('/users', Users)

//Port
const PORT = process.env.PORT || 3010;

//Starting server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


