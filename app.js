const express = require('express')
const app = express()
const port = 9000
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('./database')
const session = require('express-session')
const middleware = require('./middleware')

const server = app.listen(port, () => console.log("Server listenning on port " + port))

app.use(bodyParser.urlencoded({ extended: false }))

//View
app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}))

//Routes
app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/logout', require('./routes/logout'))
app.use('/post', middleware.requireLogin, require('./routes/posts'))
app.use('/profile', middleware.requireLogin, require('./routes/profile'))
app.use('/social-media/uploads', require('./routes/upload'))
app.use('/search', middleware.requireLogin, require('./routes/search'))
app.use('/messages', middleware.requireLogin, require('./routes/messages'))

//API Routes
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/chats', require('./routes/api/chats'))