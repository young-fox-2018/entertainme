const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
    addMovie(req, res, next) {
        axios({
            url: 'http://localhost:3001/movie',
            method: 'POST',
            data: {
                poster_path: req.body.poster_path,
                overview: req.body.overview,
                title: req.body.title,
                popularity: req.body.popularity,
                status: req.body.status
            }
        })
        .then(({data}) => {
            res.status(201).json(data)
            client.del('entertainme')
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    updateMovie(req, res, next) {
        axios({
            url: `http://localhost:3001/movie/${req.params.movieId}`,
            method: 'PUT',
            data: {
                poster_path: req.body.poster_path,
                overview: req.body.overview,
                title: req.body.title,
                popularity: req.body.popularity,
                tag: req.body.tag,
                status: req.body.status
            }
        })
        .then(({data}) => {
            res.status(201).json(data)
            client.del('entertainme')
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    deleteMovie(req, res, next) {
        axios({
            url: `http://localhost:3001/movie/${req.params.movieId}`,
            method: 'DELETE',
        })
        .then(({data}) => {
            res.status(200).json(data)
            client.del('entertainme')
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}