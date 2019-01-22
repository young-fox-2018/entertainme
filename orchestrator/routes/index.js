const express = require('express')
const router = express.Router()

const entertainmeController = require('../controllers/entertainmeController')
const moviesController = require('../controllers/movieController')
const seriesController = require('../controllers/seriesController')

router.get('/', (req, res) => {res.status(200).json({info: 'ok'})})

router.get('/entertainme', entertainmeController.get)

router.post('/movie', moviesController.addMovie)
router.put('/movie/:movieId', moviesController.updateMovie)
router.delete('/movie/:movieId', moviesController.deleteMovie)

router.post('/series', seriesController.addSeries)
router.put('/series/:seriesId', seriesController.updateSeries)
router.delete('/series/:seriesId', seriesController.deleteSeries)

module.exports = router