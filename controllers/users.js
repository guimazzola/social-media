const User = require('../schemas/User')
const Post = require('../schemas/Post')

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

module.exports = { 
    userFollow,
    userFollowing,
    userFollowers
}