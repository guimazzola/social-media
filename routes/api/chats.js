const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/chats')

router.post('/', controller.chatsPost)

module.exports = router