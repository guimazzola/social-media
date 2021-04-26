const logout = (req, res, next) => {
    if(req.session) {
        req.session.destroy(() => {
            res.redirect('/login')
        })
    }
}

module.exports = { logout }