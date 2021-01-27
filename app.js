//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//import files
const Quotes = require('./routes/Quotes')

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
}).on("error", (err) => {
    console.log(err);
})

//Middleware
app.use(bodyParser.json())
app.use(cors())

//Routes
app.get('/', ((req, res) => {
    res.send('Hello 🧒')
}))

//Middleware
app.use('/quotes', Quotes)

//Port
const PORT = process.env.PORT || 3010;

//Starting server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


