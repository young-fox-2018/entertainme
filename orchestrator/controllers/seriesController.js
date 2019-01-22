const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
    addSeries(req, res, next) {
        axios({
            url: 'http://localhost:3002/series',
            method: 'POST',
            data: {
                poster_path: req.body.poster_path,
                overview: req.body.overview,
                title: req.body.title,
                popularity: req.body.popularity,
                tag: req.body.tag
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
    updateSeries(req, res, next) {
        axios({
            url: `http://localhost:3002/series/${req.params.seriesId}`,
            method: 'PUT',
            data: {
                poster_path: req.body.poster_path,
                overview: req.body.overview,
                title: req.body.title,
                popularity: req.body.popularity,
                tag: req.body.tag
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
    deleteSeries(req, res, next) {
        axios({
            url: `http://localhost:3002/series/${req.params.seriesId}`,
            method: 'DELETE'
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