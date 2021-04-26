const express = require('express')
const router = express.Router()
const controller = require('../controllers/profile')

router.get('/', controller.profile)

router.get('/:username', controller.profileUsername)

router.get('/:username/replies', controller.profileReplies)


module.exports = router