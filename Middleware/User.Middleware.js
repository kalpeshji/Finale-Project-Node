const jwt = require('jsonwebtoken');

const User = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;

        if (!decoded.roll_id) {
            return res.status(403).json({ message: 'Role ID not found in token' });
        }
        console.log(decoded.roll_id)
        const roll = decoded.roll_id
        console.log(roll)
        if (roll == 3) {
            next()
        } else {
            // return res.status(403).json({ message: 'Unauthorized role' });
            res.redirect('/error')
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { User };
