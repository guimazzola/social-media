const express = require('express')
const app = express()
const port = 9000
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('./database')
const session = require('express-session')
const middleware = require('./middleware')


const server = app.listen(port, () => console.log("Server listenning on port " + port))
const io = require("socket.io")(server, { pingTimeout: 60000 })

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
app.use('/api/messages', require('./routes/api/messages'))

io.on("connection", (socket) => {

    socket.on("setup", userData => {
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join room", room => socket.join(room))

    socket.on("typing", room => socket.in(room).emit("typing"))

    socket.on("stop typing", room => socket.in(room).emit("stop typing"))

    socket.on("new message", newMessage => {
        var chat = newMessage.chat

        if(!chat.users) return console.log("Chat.users not defined")

        chat.users.forEach(user => {
            if(user._id == newMessage.sender._id) return
            socket.in(user._id).emit("message received", newMessage)
        })
    })

})