const jwt = require('jsonwebtoken');

const Log = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        next()
    } else {
        res.redirect('/error')
    }
};

module.exports = { Log };
