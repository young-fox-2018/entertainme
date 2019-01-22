const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seriesSchema = new Schema({
    poster_path: String,
    overview: String,
    title: String,
    popularity: Number,
    status: String,
    tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
})

const Series = mongoose.model('Series', seriesSchema)

module.exports = Series