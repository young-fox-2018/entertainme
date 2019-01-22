const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    poster_path: String,
    overview: String,
    title: String,
    popularity: Number,
    status: String,
    tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie