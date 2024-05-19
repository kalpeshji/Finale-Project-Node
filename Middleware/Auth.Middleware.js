const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
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
        if (roll == 1) {
            req.redirectUrl = '/dashboard';
        } else if (roll == 2) {
            req.redirectUrl = '/viewprodct';
        } else if (roll == 3) {
            req.redirectUrl = '/viwproduct';
        } else {
            return res.status(403).json({ message: 'Unauthorized role' });
        }
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateUser };
