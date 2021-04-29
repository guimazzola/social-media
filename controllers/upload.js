const path = require('path')

const upload = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../uploads/images/" + req.params.path))
}

module.exports = { upload }