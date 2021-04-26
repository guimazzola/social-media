const User = require('../schemas/User')

const profile = (req, res, next) => {
    var payload = {
        pageTitle: req.session.user.username,
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        profileUser: req.session.user
    }

    res.status(200).render('profile', payload)
}

const profileUsername = async (req, res, next) => {

    var payload = await getPayload(req.params.username, req.session.user)

    res.status(200).render('profile', payload)
}

const profileReplies = async (req, res, next) => {

    var payload = await getPayload(req.params.username, req.session.user)
    payload.selectedTab = 'replies'

    res.status(200).render('profile', payload)
}

async function getPayload(username, userLoggedIn) {
    var user = await User.findOne({ username: username })

    if(user == null) {

        user = await User.findById(username)

        if(user == null) {
            return {
                pageTitle: 'User not found',
                userLoggedIn: userLoggedIn,
                userLoggedInJs: JSON.stringify(userLoggedIn)
            }
        }
    }

    return {
        pageTitle: user.username,
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
        profileUser: user
    }
}

module.exports = { 
    profile, 
    profileUsername,
    profileReplies
}