const User = require('../schemas/User')

const search = (req, res, next) => {

    var payload = createPayload(req.session.user)

    res.status(200).render('search', payload)
}

const selectedTab = (req, res, next) => {

    var payload = createPayload(req.session.user)

    payload.selectedTab = req.params.selectedTab

    res.status(200).render('search', payload)
}

function createPayload(userLoggedIn) {
    return {
        pageTitle: "Search",
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn)
    }
}

module.exports = { 
    search,
    selectedTab
 }