const express = require('express')
const router = express.Router()

const seriesController = require('../controllers/seriesController')

router.get('/', seriesController.getSeries)
router.post('/', seriesController.addSeries)
router.put('/:seriesId', seriesController.updateSeries)
router.delete('/:seriesId', seriesController.deleteSeries)

module.exports = router