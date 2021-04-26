const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const controller = require('../controllers/index')

router.get('/', middleware.requireLogin, controller.indexHome)

module.exports = router