const express = require('express')
const router = express.Router()
const controller = require('../controllers/upload')

router.get('/images/:path', controller.upload)

module.exports = router