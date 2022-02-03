const router = require('express').Router()
const {
    getAllThoughts,
    createThought,
    getThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)
.post(createThought)

router
.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.put(createReaction)
.delete(deleteReaction)

module.exports = router