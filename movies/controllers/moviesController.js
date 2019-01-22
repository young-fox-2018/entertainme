const Movie = require('../models/movie')

module.exports = {
    getMovies(req, res, next) {
        Movie.find({}).populate('tag')
            .then(movies => {
                res.status(200).json({ info: 'movies found successfully', data: movies })
            })
            .catch(err => {
                res.status(500).json({ info: 'error getting movies', data: err.message })
            })
    },
    addMovies(req, res, next) {
        let newMovie = {
            poster_path: req.body.poster_path,
            overview: req.body.overview,
            title: req.body.title,
            popularity: req.body.popularity,
            tag: req.body.tag
        }
        Movie.create(newMovie)
            .then(newMovie => {
                newMovie.populate('tag', err => {
                    res.status(201).json({ info: 'movie created succesfully', data: newMovie })
                })
            })
            .catch(err => {
                res.status(500).json({ info: 'error creating new movie', data: err.message })
            })
    },
    updateMovie(req, res, next) {
        Movie.findById(req.params.movieId)
            .then(movie => {
                let updatedMovie = {
                    poster_path: req.body.poster_path || movie.poster_path,
                    overview: req.body.overview || movie.overview,
                    title: req.body.title || movie.title,
                    popularity: req.body.popularity || movie.popularity,
                    tag: req.body.tag || movie.tag
                }
                return Movie.findOneAndUpdate({ _id: req.params.movieId }, updatedMovie, { new: true })
            })
            .then(updatedMovie => {
                updatedMovie.populate('tag', err => {
                    res.status(201).json({ info: 'movie updated successfully', data: updatedMovie })
                })
            })
            .catch(err => {
                res.status(500).json({ info: 'error updating movie', data: err.message })
            })
    },
    deleteMovie(req, res, next) {
        Movie.deleteOne({_id: req.params.movieId})
            .then(result => {
                res.status(200).json({info: 'movie deleted successfully', data: result})
            })
            .catch(err => {
                res.status(500).json({info: 'error deleting movie', data: err.message})
            })
    }
}