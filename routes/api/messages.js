const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/messages')

router.post('/', controller.messageInbox)

module.exports = router