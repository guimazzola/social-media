const User = require('../schemas/User')
const bcrypt = require('bcrypt')

const loginIndex = (req, res, next) => {
    res.status(200).render('login')
}

const loginPost = async (req, res, next) => {

    var payload = req.body

    if(req.body.logUsername && req.body.logPassword) {
        var user =  await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logPassword }
            ]
        })
        .catch((error) => {
            console.log(error)

            payload.errorMessage = "Algo deu errado =("
            res.status(200).render("login", payload)
        })
        //User found
        if(user != null) {
            var result = await bcrypt.compare(req.body.logPassword, user.password)

            if(result === true){
                req.session.user = user
                return res.redirect('/')
            } 
        }

        payload.errorMessage = "Usuário ou senha incorretos."
        return res.status(200).render("login", payload)
    }
    payload.errorMessage = "Prencha todos os campos."
    res.status(200).render('login')
}

module.exports = { loginIndex, loginPost }