require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds163044.mlab.com:63044/entertainme-db`)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
    console.log('connected to m-lab entertainme-db')
})

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const moviesRouter = require('./routes/movies')
const tagsRouter = require('./routes/tags')
app.use('/movie', moviesRouter)
app.use('/tags', tagsRouter)

const port = 3001
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})

module.exports = app