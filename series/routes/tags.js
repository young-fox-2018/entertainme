const express = require('express')
const router = express.Router()

const tagsController = require('../controllers/tagsController')

router.get('/', tagsController.getTag)
router.post('/', tagsController.addTag)
router.put('/:tagId', tagsController.updateTag)
router.delete('/:tagId', tagsController.deleteTag)

module.exports = router