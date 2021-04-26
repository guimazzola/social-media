const express = require('express')
const router = express.Router()
const controller = require('../controllers/posts')

router.get('/:id', controller.postGetId)

module.exports = router