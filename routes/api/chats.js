const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/chats')

router.post('/', controller.chatsPost)

router.get('/', controller.chatsGet)

module.exports = router