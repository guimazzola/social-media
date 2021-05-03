const User = require('../schemas/User')
const Post = require('../schemas/Post')
const path = require('path')
const fs = require('fs')

const userFollow = async (req, res, next) => {

    var userId = req.params.userId

    var user = await User.findById(userId)

    if(user == null) return res.sendStatus(404)

    var isFollowing = user.followers && user.followers.includes(req.session.user._id)

    var option = isFollowing ? '$pull' : '$addToSet'

    req.session.user = await User.findByIdAndUpdate(req.session.user._id, { [option]: { following: userId } }, { new: true })
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })

    User.findByIdAndUpdate(userId, { [option]: { followers: req.session.user._id } })
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })

    res.status(200).send(req.session.user)
}

const userFollowing = async (req, res, next) => {
    User.findById(req.params.userId)
    .populate('following')
    .then(results => {
        res.status(200).send(results)
    })
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
}

const userFollowers = async (req, res, next) => {
    User.findById(req.params.userId)
    .populate('followers')
    .then(results => {
        res.status(200).send(results)
    })
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
}

const userProfilePicture =  async (req, res, next) => {
    if(!req.file) {
        console.log('No file uploaded with AJAX request.')
        return res.sendStatus(400)
    }

    var filePath = `social-media/uploads/images/${req.file.filename}.png`
    var tempPath = req.file.path
    var targetPath = path.join(__dirname, `../../${filePath}`)

    fs.rename(tempPath, targetPath, async error => {
        if(error != null) {
            console.log(error)
            return res.sendStatus(400)
        }

        req.session.user = await User.findByIdAndUpdate(req.session.user._id, { profilePic: filePath }, { new: true })
        res.sendStatus(204)
    })
}

const userCoverPhoto =  async (req, res, next) => {
    if(!req.file) {
        console.log('No file uploaded with AJAX request.')
        return res.sendStatus(400)
    }

    var filePath = `social-media/uploads/images/${req.file.filename}.png`
    var tempPath = req.file.path
    var targetPath = path.join(__dirname, `../../${filePath}`)

    fs.rename(tempPath, targetPath, async error => {
        if(error != null) {
            console.log(error)
            return res.sendStatus(400)
        }

        req.session.user = await User.findByIdAndUpdate(req.session.user._id, { coverPhoto: filePath }, { new: true })
        res.sendStatus(204)
    })
}

module.exports = { 
    userFollow,
    userFollowing,
    userFollowers,
    userProfilePicture,
    userCoverPhoto
}