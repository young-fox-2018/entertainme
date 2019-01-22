const Tag = require('../models/tag')

module.exports = {
    getTag(req, res, next) {
        Tag.find({})
            .then(tags => {
                res.status(200).json({info: 'tags found successfully', data: tags})
            })
            .catch(err => {
                res.status(500).json({info: 'error finding tags', data: err.message})
            })
    },
    addTag(req, res, next) {
        let newTag = {
            text: req.body.text
        }
        Tag.create(newTag)
            .then(newTag => {
                res.status(201).json({info: 'tag created successfully', data: newTag})
            })
            .catch(err => {
                res.status(500).json({info: 'error creating new tag', data: err.message})
            })
    },
    updateTag(req, res, next) {
        Tag.findById(req.params.tagId)
            .then(tag => {
                let updatedTag = {
                    text: req.body.text || tag.text
                }
                return Tag.findOneAndUpdate({_id: req.params.tagId}, updatedTag, {new: true})
            })
            .then(updatedTag => {
                res.status(201).json({info: 'tag updated successfully', data: updatedTag})
            })
            .catch(err => {
                res.status(500).json({info: 'error updating tag', data: err.message})
            })
    },
    deleteTag(req, res, next) {
        Tag.deleteOne({_id: req.params.tagId})
            .then(result => {
                res.status(200).json({info: 'tag deleted successfully', data: result})
            })
            .catch(err => {
                res.status(500).json({info: 'error deleting tag', data: err.message})
            })
    }
}