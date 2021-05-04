const express = require('express')
const router = express.Router()
const controller = require('../../controllers/posts')

router.get('/', controller.postsGet)

router.get('/:id', controller.postsGetSingleOne)

router.post('/', controller.postsPost)

router.put('/:id/like', controller.postsPut)

router.post('/:id/retweet', controller.postsPostRetweet)

router.delete('/:id', controller.postDelete)

router.put('/:id', controller.postPin)

module.exports = router