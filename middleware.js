//Middleware Redirecting the User if not logged in
exports.requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        //next takes to the next step
        return next()
    } else {
        return res.redirect('/login')
    }
}