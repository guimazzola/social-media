const User = require('../schemas/User')

const messages = (req, res, next) => {

    var payload = {
        pageTitle: "Inbox",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    res.status(200).render('inbox', payload)
}

const newMessage = (req, res, next) => {

    var payload = {
        pageTitle: "New message",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    res.status(200).render('newMessage', payload)
}

module.exports = { 
    messages,
    newMessage
 }