const Series = require('../models/series')

module.exports = {
    getSeries(req, res, next) {
        Series.find({}).populate('tag')
            .then(series => {
                res.status(200).json({ info: 'series found successfully', data: series })
            })
            .catch(err => {
                res.status(500).json({ info: 'error getting series', data: err.message })
            })
    },
    addSeries(req, res, next) {
        let newSeries = {
            poster_path: req.body.poster_path,
            overview: req.body.overview,
            title: req.body.title,
            popularity: req.body.popularity,
            tag: req.body.tag
        }
        Series.create(newSeries)
            .then(newSeries => {
                newSeries.populate('tag', err => {
                    res.status(201).json({ info: 'series created succesfully', data: newSeries })
                })
            })
            .catch(err => {
                res.status(500).json({ info: 'error creating new series', data: err.message })
            })
    },
    updateSeries(req, res, next) {
        Series.findById(req.params.seriesId)
            .then(series => {
                let updatedSeries = {
                    poster_path: req.body.poster_path || series.poster_path,
                    overview: req.body.overview || series.overview,
                    title: req.body.title || series.title,
                    popularity: req.body.popularity || series.popularity,
                    tag: req.body.tag || series.tag
                }
                return Series.findOneAndUpdate({ _id: req.params.seriesId }, updatedSeries, { new: true })
            })
            .then(updatedSeries => {
                updatedSeries.populate('tag', err => {
                    res.status(201).json({ info: 'series updated successfully', data: updatedSeries })
                })
            })
            .catch(err => {
                res.status(500).json({ info: 'error updating series', data: err.message })
            })
    },
    deleteSeries(req, res, next) {
        Series.deleteOne({_id: req.params.seriesId})
            .then(result => {
                res.status(200).json({info: 'series deleted successfully', data: result})
            })
            .catch(err => {
                res.status(500).json({info: 'error deleting series', data: err.message})
            })
    }
}