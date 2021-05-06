const express = require('express')
const router = express.Router()
const controller = require('../controllers/messages')

router.get('/', controller.messages)

router.get('/new', controller.newMessage)

module.exports = router