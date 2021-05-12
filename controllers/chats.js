const User = require('../schemas/User')
const Post = require('../schemas/Post')
const Chat = require('../schemas/Chat')

const chatsPost = async (req, res, next) => {
    if(!req.body.users) {
        console.log("Users param not sent with request");
        return res.sendStatus(400);
    }

    var users = JSON.parse(req.body.users);

    if(users.length == 0) {
        console.log("Users array is empty");
        return res.sendStatus(400);
    }

    users.push(req.session.user);

    var chatData = {
        users: users,
        isGroupChat: true
    };

    Chat.create(chatData)
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
}

const chatsGet = async (req, res, next) => {
    Chat.find({ users: { $elemMatch: { $eq: req.session.user._id } } })
    .populate("users")
    .sort({ updatedAt: -1 })
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
}

const chatsGetId = async (req, res, next) => {
    Chat.findOne({ _id: req.params.chatId, users: { $elemMatch: { $eq: req.session.user._id } } })
    .populate("users")
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
}

const chatPut = async (req, res, next) => {
    Chat.findByIdAndUpdate(req.params.chatId, req.body)
    .then(results => res.sendStatus(204))
    .catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
}

module.exports = { 
    chatsPost,
    chatsGet,
    chatPut,
    chatsGetId
}