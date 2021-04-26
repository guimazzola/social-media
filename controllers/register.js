const User = require('../schemas/User')
const bcrypt = require('bcrypt')

const registerIndex = (req, res, next) => {
    res.status(200).render('register')
}

const registerPost = async (req, res, next) => {

    var firstName = req.body.firstName.trim()
    var lastName = req.body.lastName.trim()
    var username = req.body.username.trim()
    var email = req.body.email.trim()
    var password = req.body.password

    var payload = req.body

    if(firstName && lastName && username && email && password) {
        //check if there is already a user with the username or email
        var user =  await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch((error) => {
            console.log(error)

            payload.errorMessage = "Algo deu errado =("
            res.status(200).render("register", payload)
        })

        if(user == null) {
            //No User Found
            var data = req.body
            
            data.password = await bcrypt.hash(password, 10)

            User.create(data)
            .then((user) => {
                req.session.user = user
                res.redirect('/')
            })
        } else {
            //User Found
            if(email == user.email) {
                payload.errorMessage = "Email já cadastrado."
            } else {
                payload.errorMessage = "Username já cadastrado."
            }
            res.status(200).render("register", payload)
        }
    }
    else {
        payload.errorMessage = "Todos os campos devem ser preenchidos."
        res.status(200).render("register", payload)
    }
}

module.exports = { registerIndex, registerPost }