const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const RegisterModel = require('../Model/Register.Schema');

const GetLogin = (req, res) => {
    res.render('Pages/Login');
};

const PostLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await RegisterModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            roll_id: user.roll_id,
        };

        const token = jwt.sign(
            payload,
            'your_secret_key',
            { expiresIn: '1h' } // optional: set an expiration time
        );

        // Set token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: true }); // 'secure: true' should be used in production with HTTPS

        res.redirect('/protected');

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const ProtetectedLogin = (req, res) => {
    // res.cookie('token', token, { httpOnly: true, secure: true });
    // res.setHeader('Authorization', `Bearer ${token}`);
    res.redirect(req.redirectUrl);
};

const Logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

module.exports = { GetLogin, PostLogin, ProtetectedLogin, Logout };