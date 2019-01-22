const express = require('express')
const router = express.Router()

const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.getMovies)
router.post('/', moviesController.addMovies)
router.put('/:movieId', moviesController.updateMovie)
router.delete('/:movieId', moviesController.deleteMovie)

module.exports = router