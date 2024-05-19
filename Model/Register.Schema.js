const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    roll_id: {
        type: Number,
        default: 3
    }
})

const RegisterModel = mongoose.model('User', RegisterSchema)

module.exports = RegisterModel