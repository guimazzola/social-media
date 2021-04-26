const express = require('express')
const router = express.Router()
const controller = require('../controllers/register')

router.get('/', controller.registerIndex)

router.post('/', controller.registerPost)

module.exports = router