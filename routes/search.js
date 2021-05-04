const express = require('express')
const router = express.Router()
const controller = require('../controllers/search')

router.get('/', controller.search)

router.get('/:selectedTab', controller.selectedTab)

module.exports = router