const express = require('express')
const router = express.Router()
const controller = require('../controllers/login')

router.get('/', controller.loginIndex)

router.post('/', controller.loginPost)

module.exports = router