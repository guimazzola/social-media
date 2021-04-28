const express = require('express')
const router = express.Router()
const controller = require('../../controllers/users')

router.put('/:userId/follow', controller.userFollow)

router.get('/:userId/following', controller.userFollowing)

router.get('/:userId/followers', controller.userFollowers)

module.exports = router