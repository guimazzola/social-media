const express = require('express')
const router = express.Router()
const controller = require('../../controllers/users')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.put('/:userId/follow', controller.userFollow)

router.get('/:userId/following', controller.userFollowing)

router.get('/:userId/followers', controller.userFollowers)

router.post('/profilePicture', upload.single('croppedImage'), controller.userProfilePicture)

router.post('/coverPhoto', upload.single('croppedImage'), controller.userCoverPhoto)

module.exports = router