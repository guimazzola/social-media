const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/chats')

router.post('/', controller.chatsPost)

router.get('/', controller.chatsGet)

router.get('/:chatId', controller.chatsGetId)

router.put('/:chatId', controller.chatPut)

module.exports = router